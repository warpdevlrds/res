import { useState } from 'react';
import { useStore, User } from '@/store/store';
import { User as UserIcon, Dumbbell } from 'lucide-react';

export default function LoginPage() {
  const { setUser, addUser } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as 'trainer' | 'student',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let user: User;
    if (isLogin) {
      // Simula??o de login - em produ??o, usar autentica??o real
      user = {
        id: formData.email,
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        role: formData.role,
      };
    } else {
      // Simula??o de registro
      user = {
        id: formData.email,
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
    }
    
    setUser(user);
    addUser(user);
    
    // Redirecionar ap?s login
    if (typeof window !== 'undefined') {
      if (user.role === 'trainer') {
        window.location.href = '/trainer/dashboard';
      } else {
        window.location.href = '/student/dashboard';
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-primary-600 p-4 rounded-full">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Personal Trainer App
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                required={!isLogin}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="????????"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de conta
            </label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === 'student'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'trainer' | 'student' })}
                  className="mr-2"
                />
                <UserIcon className="w-4 h-4 mr-1" />
                Aluno
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="trainer"
                  checked={formData.role === 'trainer'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'trainer' | 'student' })}
                  className="mr-2"
                />
                <Dumbbell className="w-4 h-4 mr-1" />
                Personal Trainer
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            {isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? 'N?o tem uma conta? ' : 'J? tem uma conta? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-600 font-semibold hover:underline"
          >
            {isLogin ? 'Crie uma' : 'Entre'}
          </button>
        </p>
      </div>
    </div>
  );
}
