import json
from decimal import Decimal, InvalidOperation

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Producto


@csrf_exempt
@require_http_methods(["GET", "POST"])
def lista_productos(request):
    """GET  -> devuelve el listado de productos en JSON.
    POST -> agrega un nuevo producto (descripcion, precio)."""
    if request.method == "GET":
        datos = [p.to_dict() for p in Producto.objects.order_by("codigo")]
        return JsonResponse(datos, safe=False)

    # POST: crear un nuevo producto
    try:
        cuerpo = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido"}, status=400)

    descripcion = str(cuerpo.get("descripcion", "")).strip()
    if not descripcion:
        return JsonResponse({"error": "La descripción es obligatoria"}, status=400)

    try:
        precio = Decimal(str(cuerpo.get("precio")))
    except (InvalidOperation, TypeError):
        return JsonResponse({"error": "El precio debe ser un número"}, status=400)
    if precio < 0:
        return JsonResponse({"error": "El precio no puede ser negativo"}, status=400)

    producto = Producto.objects.create(descripcion=descripcion, precio=precio)
    return JsonResponse(producto.to_dict(), status=201)
