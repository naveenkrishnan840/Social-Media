from . import views
from django.urls import path
from rest_framework import routers

# router = routers.DefaultRouter()
#
# router.register(r"social_media", views.SocialMedia.as_view(), basename="social_media")


# urlpatterns = router.urls
urlpatterns = [
    path("social_media", views.SocialMedia.as_view(), name="social_media"),
    path("social_media/send_request_check", views.send_request_check, name="send_request_check")
]