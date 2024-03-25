from rest_framework import serializers


class UserRegistration(serializers.Serializer):
    user_id = serializers.IntegerField()
    user_name = serializers.CharField()
    email_id = serializers.CharField()
    request_complete = serializers.IntegerField()


class FriendRequestStatus(serializers.Serializer):
    # from_user_id = serializers.IntegerField()
    to_user_id = serializers.IntegerField()
    to_user_name = serializers.CharField()
    to_email_id = serializers.CharField()