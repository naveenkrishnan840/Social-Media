import json
from hashlib import md5
from django.shortcuts import render, HttpResponse
from . import models
from django import views
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import serializer
from django.db.models import Q, F
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator


# Create your views here.


@api_view(["POST"])
@ratelimit(key="ip", rate="3/m")
def send_request_check(request):
    from_user = request.data[1]["from_user"]
    to_user = request.data[1]["to_user"]
    if models.FriendRequestStatus.objects.filter(from_user_id=from_user, to_user_id=to_user,
                                                 request_status__in=[1, 2]).exists():
        response = ["SendRequestFailed", {}]
    else:
        models.FriendRequestStatus.objects.create(from_user_id=from_user, to_user_id=to_user)

        response = ["SendRequestSuccess", {}]
    response = json.dumps(response)
    return Response(response)


class SocialMedia(APIView):
    def get(self, request):
        return HttpResponse('sdf')

    # @method_decorator(request_fn)
    def post(self, request):
        if request.data[0] == "RegisterUser":
            user_name = request.data[1]["user_name"]
            email = request.data[1]["email"]
            password = md5(request.data[1]["password"].encode()).hexdigest()
            if not models.UserRegistration.objects.filter(email_id=email).exists():
                models.UserRegistration.objects.create(user_name=user_name, email_id=email,
                                                       password=password)
                response = ["UserRegistrationSuccess", {}]

            else:
                response = ["Already Have Account", {}]
        elif request.data[0] == "LoginUser":
            email = request.data[1]["email"]
            password = md5(request.data[1]["password"].encode()).hexdigest()
            user_data = models.UserRegistration.objects.filter(email_id=email, password=password)
            if user_data.exists():
                last_user = user_data.last()
                user_details = serializer.UserRegistration(last_user).data
                response = ["UserLogInSuccess", user_details]

            else:
                response = ["UserLogInFailed", {}]
        elif request.data[0] == "GetAllUsers":
            user_id = request.data[1][0]["user_id"]
            other_user = models.UserRegistration.objects.filter(~Q(user_id=user_id), request_complete=0)
            request_users = (models.FriendRequestStatus.objects.filter(to_user_id=user_id, request_status=0).
                             values_list("from_user_id", flat=True))
            user_details = serializer.UserRegistration(other_user, many=True).data
            for i in user_details:
                if i["user_id"] in request_users:
                    i["status"] = "2,3"
                else:
                    i["status"] = "0"
            response = ["GetAllUsersSuccess", user_details]

        elif request.data[0] == "GetPendingUsers":
            get_user_id = request.data[1]["user_id"]
            pending_users = (models.FriendRequestStatus.objects.annotate(to_user_name=F("to_user__user_name"),
                                                                         to_email_id=F("to_user__email_id")).
                             filter(from_user_id=get_user_id, request_status=1).values("to_user_name", "to_user_id",
                                                                                       "to_email_id"))
            pending_users = serializer.FriendRequestStatus(pending_users, many=True).data
            response = ["GetPendingUsersSuccess", pending_users]

        elif request.data[0] == "GetAcceptUsers":
            get_user_id = request.data[1]["user_id"]
            accept_users = (models.FriendRequestStatus.objects.annotate(to_user_name=F("to_user__user_name"),
                                                                        to_email_id=F("to_user__email_id")).
                            filter(from_user_id=get_user_id, request_status__in=[2, 3]).values("to_user_name",
                                                                                               "to_user_id",
                                                                                               "to_email_id"))
            accept_users = serializer.FriendRequestStatus(accept_users, many=True).data
            response = ["GetAcceptUsersSuccess", accept_users]

        elif request.data[0] == "ChangeStatus":
            from_user = request.data[1]["from_user"]
            to_user = request.data[1]["to_user"]
            status = 2 if request.data[1]["status"] == "accept" else 3
            (models.FriendRequestStatus.objects.filter(from_user_id=from_user, to_user_id=to_user).
             update(request_status=status))
            response = ["StatusChanged", {}]

        response = json.dumps(response)
        return Response(response)
