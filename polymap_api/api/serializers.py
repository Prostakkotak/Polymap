from rest_framework import serializers

class GroupSerializer(serializers.Serializer):
   schedule = serializers.JSONField()