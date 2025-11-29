import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
}

interface Habit {
  id: number;
  title: string;
  emoji: string;
  completed: boolean;
  streak: number;
}

const motivationalMessages = [
  "Отлично! Ты супер! 🎉",
  "Продолжай в том же духе! 💪",
  "Ты молодец! Так держать! ⭐",
  "Прогресс налицо! 🚀",
  "Ты на правильном пути! 🌟",
  "Восхитительно! Продолжай! 🔥"
];

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Утренняя медитация', category: 'Здоровье', completed: false },
    { id: 2, title: 'Позвонить маме', category: 'Семья', completed: false },
    { id: 3, title: 'Закончить презентацию', category: 'Карьера', completed: false },
    { id: 4, title: 'Поход в спортзал', category: 'Здоровье', completed: false },
    { id: 5, title: 'Прочитать 20 страниц', category: 'Развитие', completed: false },
    { id: 6, title: 'Встреча с друзьями', category: 'Отношения', completed: false },
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, title: 'Выпить 2л воды', emoji: '💧', completed: false, streak: 5 },
    { id: 2, title: 'Утренняя зарядка', emoji: '🏃‍♀️', completed: false, streak: 12 },
    { id: 3, title: 'Планирование дня', emoji: '📝', completed: false, streak: 8 },
    { id: 4, title: 'Благодарность', emoji: '🙏', completed: false, streak: 15 },
    { id: 5, title: 'Здоровый завтрак', emoji: '🥗', completed: false, streak: 7 },
  ]);

  const categories = ['Все', 'Здоровье', 'Карьера', 'Семья', 'Развитие', 'Отношения'];
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    if (!tasks.find(t => t.id === id)?.completed) {
      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      toast({
        title: message,
        description: "Задача выполнена!",
        duration: 2000,
      });
    }
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        return {
          ...habit,
          completed: newCompleted,
          streak: newCompleted ? habit.streak + 1 : habit.streak
        };
      }
      return habit;
    }));

    if (!habits.find(h => h.id === id)?.completed) {
      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      toast({
        title: message,
        description: "Привычка выполнена!",
        duration: 2000,
      });
    }
  };

  const filteredTasks = selectedCategory === 'Все' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const taskProgress = (completedTasks / totalTasks) * 100;

  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const habitProgress = (completedHabits / totalHabits) * 100;

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-primary shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold">
                  АН
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Мой Трекер Жизни
                </h1>
                <p className="text-muted-foreground mt-1">Сделай свою жизнь ярче! 🌈</p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg">
              <Icon name="Share2" size={20} className="mr-2" />
              Поделиться
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all animate-scale-in">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="Target" className="text-primary" size={24} />
                    </div>
                    <p className="font-semibold text-sm text-muted-foreground">Задачи</p>
                  </div>
                  <p className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {completedTasks}/{totalTasks}
                  </p>
                </div>
                <Progress value={taskProgress} className="h-3 mt-3" />
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20 shadow-lg hover:shadow-xl transition-all animate-scale-in" style={{animationDelay: '0.1s'}}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Icon name="Zap" className="text-secondary" size={24} />
                    </div>
                    <p className="font-semibold text-sm text-muted-foreground">Привычки</p>
                  </div>
                  <p className="text-3xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    {completedHabits}/{totalHabits}
                  </p>
                </div>
                <Progress value={habitProgress} className="h-3 mt-3" />
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 shadow-lg hover:shadow-xl transition-all animate-scale-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon name="Flame" className="text-accent" size={24} />
                    </div>
                    <p className="font-semibold text-sm text-muted-foreground">Стрик</p>
                  </div>
                  <p className="text-3xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent animate-pulse-glow">
                    {totalStreak}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-3">дней подряд 🔥</p>
              </CardContent>
            </Card>
          </div>
        </header>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-white/60 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="tasks" className="text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="CheckSquare" size={20} className="mr-2" />
              Задачи
            </TabsTrigger>
            <TabsTrigger value="habits" className="text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-accent data-[state=active]:text-white">
              <Icon name="Repeat" size={20} className="mr-2" />
              Привычки
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-primary data-[state=active]:text-white">
              <Icon name="User" size={20} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="mt-6 animate-fade-in">
            <div className="mb-6">
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm font-semibold transition-all ${
                      selectedCategory === category 
                        ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md' 
                        : 'hover:bg-primary/10'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTasks.map((task, index) => (
                <Card 
                  key={task.id} 
                  className={`border-2 shadow-md hover:shadow-lg transition-all cursor-pointer animate-fade-in ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-primary/50'
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                  onClick={() => toggleTask(task.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="h-6 w-6 border-2"
                      />
                      <div className="flex-1">
                        <p className={`font-semibold text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {task.category}
                        </Badge>
                      </div>
                      {task.completed && (
                        <Icon name="CheckCircle2" className="text-green-500 animate-bounce-subtle" size={24} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button size="lg" className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg h-14 text-lg font-bold">
              <Icon name="Plus" size={24} className="mr-2" />
              Добавить задачу
            </Button>
          </TabsContent>

          <TabsContent value="habits" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habits.map((habit, index) => (
                <Card 
                  key={habit.id}
                  className={`border-2 shadow-md hover:shadow-xl transition-all cursor-pointer animate-fade-in ${
                    habit.completed ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-white border-gray-200 hover:border-secondary/50'
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                  onClick={() => toggleHabit(habit.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`text-4xl ${habit.completed ? 'animate-bounce-subtle' : ''}`}>
                          {habit.emoji}
                        </div>
                        <div>
                          <p className={`font-bold text-lg ${habit.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {habit.title}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Icon name="Flame" className="text-orange-500" size={16} />
                            <span className="text-sm font-bold text-orange-500">{habit.streak} дней</span>
                          </div>
                        </div>
                      </div>
                      <Checkbox 
                        checked={habit.completed}
                        onCheckedChange={() => toggleHabit(habit.id)}
                        className="h-6 w-6 border-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button size="lg" className="w-full mt-6 bg-gradient-to-r from-secondary to-accent hover:opacity-90 shadow-lg h-14 text-lg font-bold">
              <Icon name="Plus" size={24} className="mr-2" />
              Создать привычку
            </Button>
          </TabsContent>

          <TabsContent value="profile" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Icon name="Award" className="text-primary" />
                    Достижения
                  </CardTitle>
                  <CardDescription>Твои успехи и награды</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                      <div className="text-4xl mb-2">🏆</div>
                      <p className="font-bold">Новичок</p>
                      <p className="text-xs text-muted-foreground">5 задач</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                      <div className="text-4xl mb-2">⭐</div>
                      <p className="font-bold">Целеустремленная</p>
                      <p className="text-xs text-muted-foreground">7 дней подряд</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                      <div className="text-4xl mb-2">💪</div>
                      <p className="font-bold">Сильная</p>
                      <p className="text-xs text-muted-foreground">15 привычек</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="font-bold">Фокус</p>
                      <p className="text-xs text-muted-foreground">100% за день</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Icon name="TrendingUp" className="text-secondary" />
                    Статистика
                  </CardTitle>
                  <CardDescription>Твой прогресс за неделю</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Выполнено задач</span>
                        <span className="font-bold text-primary">{completedTasks}</span>
                      </div>
                      <Progress value={taskProgress} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Активных привычек</span>
                        <span className="font-bold text-secondary">{totalHabits}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Общий стрик</span>
                        <span className="font-bold text-accent">{totalStreak} дней</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl border-2 border-primary/20">
                      <p className="text-center font-bold text-lg">🌟 Ты отлично справляешься! 🌟</p>
                      <p className="text-center text-sm text-muted-foreground mt-1">
                        Продолжай в том же духе и достигай новых высот!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 border-2 border-accent/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Users" className="text-accent" />
                  Мои челленджи
                </CardTitle>
                <CardDescription>Совместные вызовы с подругами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold">30 дней йоги 🧘‍♀️</p>
                      <p className="text-sm text-muted-foreground">С Машей и Катей</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-primary to-secondary">День 12/30</Badge>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold">Здоровое питание 🥗</p>
                      <p className="text-sm text-muted-foreground">С Аней</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-secondary to-accent">День 5/21</Badge>
                  </div>
                </div>
                <Button size="lg" className="w-full mt-4 bg-gradient-to-r from-accent to-primary hover:opacity-90 shadow-lg h-12 font-bold">
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Создать челлендж
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}