from rest_framework import generics, permissions, status
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import Articles
from .serializers import ArticlesSerializer,UserSerializer,MyTOPS
# from django.shortcuts import get_object_or_404
from django.utils.deprecation import MiddlewareMixin
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.views import TokenObtainPairView


class DisableCSRFMiddleware(MiddlewareMixin):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)


# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class ArticlesListView(generics.ListCreateAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticlesSerializer
    # permission_classes = [IsAuthenticated]  # Ensure only authenticated users can create articles

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user) 
    


class ArticlesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticlesSerializer
    # permission_classes = [IsAuthenticated]
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginTokenView(TokenObtainPairView):
    serializer_class = MyTOPS
# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             token, created = Token.objects.get_or_create(user=user)
#             login(request, user)
#             return Response({'Authorization': token.key}, status=status.HTTP_200_OK)
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    
    def post(self, request):
         if request.user.is_authenticated:
            request.user.auth_token.delete()
            logout(request)
            return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
         else:
            return Response({'message': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)




