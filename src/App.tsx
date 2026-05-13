import React, { useState, useMemo, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  Baby, 
  ClipboardCheck, 
  Sun, 
  Brain, 
  ChevronLeft, 
  ChevronRight,
  Home as HomeIcon,
  BookOpen,
  Info,
  ArrowLeft,
  Calendar as CalendarIcon,
  User,
  Plus,
  Send,
  Settings,
  BarChart3,
  Droplets,
  ShieldCheck,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { categories as staticCategories, contentItems as staticContentItems } from './data/healthData';
import { NavigationState, ScreenType, Category, ContentItem } from './types';

// Icon Mapping Helper
const IconMap: Record<string, any> = {
  Sparkles,
  Heart,
  Baby,
  ClipboardCheck,
  Sun,
  Brain,
  Droplets,
  ShieldCheck
};

type TabType = 'hoje' | 'ciclo' | 'conteudos' | 'perfil';

interface ApiUser {
  id: number;
  name: string;
  email: string;
  cycle_length: number | null;
  period_length: number | null;
  last_menstruation: string | null;
  avatar_url: string | null;
}

interface ApiContent {
  id: number;
  category_id: string;
  title: string;
  summary: string;
  text: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('hoje');
  const [nav, setNav] = useState<NavigationState>({ screen: 'home' });
  const [selectedCategory, setSelectedCategory] = useState<string>('menstruacao');
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [apiContents, setApiContents] = useState<ApiContent[]>([]);
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [userForm, setUserForm] = useState({
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    cycleLength: 28,
    periodLength: 5,
    lastMenstruation: '2023-11-15',
    avatarUrl: '',
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(() => {
    // Carregar usuário atual (se existir)
    fetch(`${API_URL}/api/user`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data);
          setIsAuthenticated(true);
          setUserForm({
            name: data.name,
            email: data.email,
            cycleLength: data.cycle_length ?? 28,
            periodLength: data.period_length ?? 5,
            lastMenstruation: data.last_menstruation ?? '2023-11-15',
            avatarUrl: data.avatar_url ?? '',
          });
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });

    // Carregar conteúdos
    fetch(`${API_URL}/api/contents`)
      .then((res) => res.json())
      .then((data) => setApiContents(data))
      .catch(() => {});
  }, [API_URL]);

  const handleSaveUser = async () => {
    try {
      setIsSavingUser(true);
      const res = await fetch(`${API_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm),
      });
      const data = await res.json();
      setUser(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleLogin = async () => {
    if (!userForm.name || !userForm.email) return;
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userForm.name,
          email: userForm.email,
          avatarUrl: userForm.avatarUrl,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setLoginError(err.error || 'Erro ao entrar. Tente novamente.');
        return;
      }
      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
      setUserForm((prev) => ({
        ...prev,
        cycleLength: data.cycle_length ?? prev.cycleLength,
        periodLength: data.period_length ?? prev.periodLength,
        lastMenstruation: data.last_menstruation ?? prev.lastMenstruation,
        avatarUrl: data.avatar_url ?? prev.avatarUrl,
      }));
    } catch (e) {
      console.error(e);
      setLoginError('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
  };

  const handleAvatarChange = async (file: File | null) => {
    if (!file || !userForm.email) return;
    try {
      setIsUploadingAvatar(true);
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('email', userForm.email);

      const res = await fetch(`${API_URL}/api/user/avatar`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUser(data);
      setUserForm((prev) => ({
        ...prev,
        avatarUrl: data.avatar_url ?? prev.avatarUrl,
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const navigateTo = (screen: ScreenType, params?: any) => {
    setNav({ screen, params });
    window.scrollTo(0, 0);
  };

  const allContents: ContentItem[] = useMemo(
    () =>
      apiContents.length > 0
        ? apiContents.map((c) => ({
            id: String(c.id),
            categoryId: c.category_id,
            title: c.title,
            summary: c.summary,
            text: c.text,
            tips: [],
            references: [],
          }))
        : staticContentItems,
    [apiContents],
  );

  const currentContent = useMemo(
    () => allContents.find((c) => c.id === nav.params?.contentId),
    [allContents, nav.params?.contentId],
  );

  const filteredContent = useMemo(
    () => allContents.filter((item) => item.categoryId === selectedCategory),
    [allContents, selectedCategory],
  );

  // Calendário dinâmico com mês atual
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysInMonth = currentMonthEnd.getDate();
  const startWeekDay = currentMonthStart.getDay(); // 0 = domingo

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const calendarCells = useMemo(() => {
    const cells: (number | null)[] = [];
    for (let i = 0; i < startWeekDay; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(d);
    }
    return cells;
  }, [startWeekDay, daysInMonth]);

  const lastMenstruationDate = useMemo(() => {
    if (!userForm.lastMenstruation) return null;
    const d = new Date(userForm.lastMenstruation);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [userForm.lastMenstruation]);

  const nextPeriodLabel = useMemo(() => {
    if (!lastMenstruationDate || !userForm.cycleLength) return '—';
    const next = new Date(lastMenstruationDate);
    while (next <= today) {
      next.setDate(next.getDate() + userForm.cycleLength);
    }
    return next.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }, [lastMenstruationDate, userForm.cycleLength, today]);

  const getDayType = (day: number | null) => {
    if (!day || !lastMenstruationDate || !userForm.cycleLength || !userForm.periodLength) return null;
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    const diffDays = Math.floor(
      (date.getTime() - lastMenstruationDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays < 0) return null;
    const cyclePos = diffDays % userForm.cycleLength;

    // Menstruação
    if (cyclePos >= 0 && cyclePos < userForm.periodLength) return 'menstruacao';

    // Ovulação (aprox. 14 dias antes do fim do ciclo)
    const ovulationDay = userForm.cycleLength - 14;
    if (cyclePos === ovulationDay) return 'ovulacao';

    // Janela fértil: 3 dias antes e 2 depois da ovulação
    if (cyclePos >= ovulationDay - 3 && cyclePos <= ovulationDay + 2) return 'fertil';

    return null;
  };

  // Tela de login/cadastro (só mostra depois de terminar checagem inicial)
  if (!isAuthenticated && !isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#FDF2F8] font-sans text-slate-900 flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-white rounded-[32px] shadow-lg p-8 space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-7 h-7 text-white fill-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-800 text-center">
              Entrar ou criar conta
            </h1>
            <p className="text-xs text-slate-500 text-center">
              Salve seu calendário menstrual e seus conteúdos favoritos.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500">Nome</label>
              <input
                className="w-full border border-slate-200 rounded-xl px-3 py-2"
                placeholder="Seu nome"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500">E-mail</label>
              <input
                className="w-full border border-slate-200 rounded-xl px-3 py-2"
                placeholder="voce@email.com"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-pink-500 text-white rounded-full py-3 text-sm font-bold shadow-md active:scale-[0.99] transition"
          >
            Continuar
          </button>

          {loginError && (
            <p className="text-[11px] text-center text-red-500 font-medium">{loginError}</p>
          )}

          <p className="text-[10px] text-center text-slate-400">
            Ao continuar, você salva seus dados de forma anônima para acompanhar seu ciclo.
          </p>
        </div>
      </div>
    );
  }

  // Enquanto verifica se já existe usuário salvo, mostra uma tela de carregamento
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#FDF2F8] font-sans text-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
          <p className="text-xs font-medium">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF2F8] font-sans text-slate-900 pb-24">
      {/* Header */}
      <header className="bg-white/50 px-6 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
        </div>
        <h1 className="text-sm font-semibold text-slate-800">Minha Saúde Feminina</h1>
      </header>

      <main className="px-6 py-4 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {/* TAB: HOJE (CALENDÁRIO) */}
          {activeTab === 'hoje' && (
            <motion.div key="hoje" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-5 h-5 text-pink-500" />
                <h2 className="text-xl font-bold text-slate-800">Calendário Menstrual</h2>
              </div>

              <div className="bg-[#E9D5FF] rounded-[40px] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <ChevronLeft className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-lg">
                    {monthNames[today.getMonth()]} {today.getFullYear()}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
                <div className="grid grid-cols-7 gap-y-4 text-center">
                  {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(d => (
                    <span key={d} className="text-[10px] font-bold text-white/70">{d}</span>
                  ))}
                  {calendarCells.map((d, idx) => {
                    const type = getDayType(d);
                    const isToday = d === today.getDate();
                    let bgClass = '';
                    if (type === 'menstruacao') bgClass = 'bg-pink-200 text-pink-900';
                    if (type === 'fertil') bgClass = 'bg-yellow-200 text-yellow-900';
                    if (type === 'ovulacao') bgClass = 'bg-green-200 text-green-900';
                    if (isToday) bgClass = 'bg-pink-500 text-white';

                    return (
                      <div key={idx} className="flex justify-center items-center h-8">
                        {d && (
                          <span
                            className={`text-sm font-medium w-8 h-8 rounded-full flex items-center justify-center ${
                              bgClass || 'text-white'
                            }`}
                          >
                            {d}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-[10px] font-bold text-slate-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-200" /> Menstruação</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-200" /> Fértil</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-200" /> Ovulação</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500" /> Hoje</div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800">Mais informações</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <CalendarIcon className="w-5 h-5 text-pink-300 mb-2" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Próxima menstruação</p>
                    <p className="text-xl font-bold">{nextPeriodLabel}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <Heart className="w-5 h-5 text-pink-300 mb-2" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Registros de Sintomas</p>
                    <p className="text-xl font-bold">0</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: CICLO (CHAT) */}
          {activeTab === 'ciclo' && (
            <motion.div key="ciclo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-[70vh]">
              <div className="flex-1 overflow-y-auto space-y-4 py-4">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Olá! Envie perguntas anônimas ou digite 'É normal isso?' para conversar sobre suas dúvidas
                  </p>
                  <span className="text-[10px] text-slate-300 mt-2 block">18:19</span>
                </div>
              </div>
              <div className="mt-auto space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Digite sua pergunta anônima..." 
                    className="w-full bg-white border border-slate-100 rounded-full py-4 px-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                  <button className="absolute right-2 top-2 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-slate-400 italic">
                  Digite "É normal isso?" para iniciar uma conversa automática
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB: CONTEÚDOS */}
          {activeTab === 'conteudos' && (
            <motion.div key="conteudos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {nav.screen === 'home' ? (
                <>
                  <div className="bg-purple-600 rounded-[32px] p-8 text-white text-center space-y-2">
                    <h2 className="text-2xl font-bold">Educação Sexual</h2>
                    <p className="text-xs text-purple-100">Informação segura para sua saúde e bem-estar</p>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {staticCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-xs font-bold transition-all ${selectedCategory === cat.id ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-100'}`}
                      >
                        {React.createElement(IconMap[cat.icon], { className: "w-4 h-4" })}
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800">Artigos sobre {staticCategories.find(c => c.id === selectedCategory)?.name}</h3>
                    {filteredContent.map(item => (
                      <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3">
                        <h4 className="font-bold text-slate-800">{item.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.summary}</p>
                        <button 
                          onClick={() => navigateTo('content', { contentId: item.id })}
                          className="text-pink-500 text-xs font-bold flex items-center gap-1"
                        >
                          Ler mais <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-pink-500 font-bold text-sm">
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">{currentContent?.title}</h2>
                    <p className="text-slate-600 leading-relaxed">{currentContent?.text}</p>
                    <div className="bg-pink-50 p-6 rounded-3xl space-y-3">
                      <h4 className="font-bold text-pink-600 text-sm">Dicas Úteis</h4>
                      <ul className="space-y-2">
                        {currentContent?.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-slate-600 flex gap-2">
                            <span className="text-pink-400">•</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB: PERFIL */}
          {activeTab === 'perfil' && (
            <motion.div key="perfil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-300">Meu Perfil</h2>
              
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div
                    className="w-24 h-24 bg-purple-200 rounded-full border-4 border-purple-400 flex items-center justify-center text-[10px] text-purple-600 font-bold overflow-hidden"
                    style={
                      userForm.avatarUrl
                        ? {
                            backgroundImage: `url(${API_URL}${userForm.avatarUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : undefined
                    }
                  >
                    {!userForm.avatarUrl && '100 x 100'}
                  </div>
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white border-2 border-white cursor-pointer">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleAvatarChange(e.target.files?.[0] ?? null)}
                    />
                  </label>
                  {isUploadingAvatar && (
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-500">
                      Enviando foto...
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-purple-400">{userForm.name}</h3>
                  <p className="text-xs text-purple-200">{userForm.email}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
                <div className="flex items-center gap-2 text-purple-600 font-bold">
                  <CalendarIcon className="w-5 h-5" /> Informações do Ciclo
                </div>
                <div className="space-y-2 text-xs font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duração do ciclo:</span>
                    <span className="text-purple-600 font-bold">{userForm.cycleLength} dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duração do período:</span>
                    <span className="text-purple-600 font-bold">{userForm.periodLength} dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Última menstruação:</span>
                    <span className="text-purple-600 font-bold">{userForm.lastMenstruation}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
                <div className="flex items-center gap-2 text-pink-600 font-bold">
                  <Settings className="w-5 h-5" /> Configurações
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Notificações</p>
                      <p className="text-[10px] text-slate-400">Receber lembretes do ciclo</p>
                    </div>
                    <div className="w-12 h-6 bg-pink-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Compartilhar dados</p>
                      <p className="text-[10px] text-slate-400">Permitir uso para pesquisas</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-100 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-500 uppercase">Editar perfil (salvo no banco)</p>
                  <div className="space-y-2 text-xs">
                    <input
                      className="w-full border border-slate-200 rounded-xl px-3 py-2"
                      placeholder="Nome"
                      value={userForm.name}
                      onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    />
                    <input
                      className="w-full border border-slate-200 rounded-xl px-3 py-2"
                      placeholder="Email"
                      value={userForm.email}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        className="border border-slate-200 rounded-xl px-3 py-2"
                        placeholder="Ciclo"
                        value={userForm.cycleLength}
                        onChange={(e) => setUserForm({ ...userForm, cycleLength: Number(e.target.value) })}
                      />
                      <input
                        type="number"
                        className="border border-slate-200 rounded-xl px-3 py-2"
                        placeholder="Período"
                        value={userForm.periodLength}
                        onChange={(e) => setUserForm({ ...userForm, periodLength: Number(e.target.value) })}
                      />
                      <input
                        type="date"
                        className="border border-slate-200 rounded-xl px-3 py-2"
                        value={userForm.lastMenstruation}
                        onChange={(e) => setUserForm({ ...userForm, lastMenstruation: e.target.value })}
                      />
                    </div>
                    <button
                      onClick={handleSaveUser}
                      disabled={isSavingUser}
                      className="w-full bg-pink-500 text-white rounded-full py-2 text-xs font-bold mt-1 disabled:opacity-60"
                    >
                      {isSavingUser ? 'Salvando...' : 'Salvar perfil'}
                    </button>
                    {user && (
                      <p className="text-[10px] text-emerald-500 mt-1">
                        Dados carregados do banco para {user.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-indigo-600 font-bold">
                  <BarChart3 className="w-5 h-5" /> Estatísticas
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xl font-bold text-indigo-600">28</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase">Ciclos registrados</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-pink-500">72%</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase">Regularidade</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-indigo-600">5.2</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase">Duração média</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg z-30 border-4 border-white">
        <Plus className="w-8 h-8" />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 flex justify-between items-center z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <button 
          onClick={() => setActiveTab('hoje')}
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'hoje' ? 'text-pink-500' : 'text-slate-400'}`}
        >
          <CalendarIcon className="w-5 h-5" />
          <span className="text-[10px] font-bold">Hoje</span>
        </button>
        <button 
          onClick={() => setActiveTab('ciclo')}
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'ciclo' ? 'text-pink-500' : 'text-slate-400'}`}
        >
          <Droplets className="w-5 h-5" />
          <span className="text-[10px] font-bold">Ciclo</span>
        </button>
        <div className="w-16" /> {/* Spacer for FAB */}
        <button 
          onClick={() => { setActiveTab('conteudos'); navigateTo('home'); }}
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'conteudos' ? 'text-pink-500' : 'text-slate-400'}`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold">Conteúdos</span>
        </button>
        <button 
          onClick={() => setActiveTab('perfil')}
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'perfil' ? 'text-pink-500' : 'text-slate-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </nav>
    </div>
  );
}
