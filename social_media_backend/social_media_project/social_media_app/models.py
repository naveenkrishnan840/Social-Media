from django.db import models

# Create your models here.


class UserRegistration(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=100)
    email_id = models.CharField(max_length=100)
    password = models.CharField(max_length=1000)

    class Meta:
        db_table = "tbl_users"


class FriendRequestStatus(models.Model):
    from_user_id = models.IntegerField()
    to_user = models.ForeignKey(to=UserRegistration, on_delete=models.CASCADE)
    request_status = models.IntegerField(default="0")

    class Meta:
        db_table="tbl_friend_request_status"
