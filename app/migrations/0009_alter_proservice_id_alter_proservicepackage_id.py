# Generated by Django 5.0.4 on 2024-04-27 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_alter_proservice_id_alter_proservicepackage_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proservice',
            name='id',
            field=models.UUIDField(editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='proservicepackage',
            name='id',
            field=models.UUIDField(editable=False, primary_key=True, serialize=False),
        ),
    ]
