from decimal import Decimal

from django.db import migrations


def cargar_datos(apps, schema_editor):
    Producto = apps.get_model("productos", "Producto")
    Producto.objects.create(descripcion="Coca cola", precio=Decimal("2.33"))
    Producto.objects.create(descripcion="Fanta", precio=Decimal("1.70"))


def borrar_datos(apps, schema_editor):
    Producto = apps.get_model("productos", "Producto")
    Producto.objects.filter(descripcion__in=["Coca cola", "Fanta"]).delete()


class Migration(migrations.Migration):
    dependencies = [("productos", "0001_initial")]
    operations = [migrations.RunPython(cargar_datos, borrar_datos)]
