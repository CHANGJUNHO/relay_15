"""ai URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_swagger.views import get_swagger_view
import predict.urls
import bertpredict.urls
import predict2.urls

schema_view = get_swagger_view(title="API 문서")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', schema_view),
    path('', include(predict.urls)),
    path('', include(bertpredict.urls)),
    path('', include(predict2.urls)),
]
