import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Calendar, 
  Activity, 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Heart, 
  TrendingUp,
  X,
  CheckCircle2,
  Info
} from 'lucide-react';
import { AnimatedButton } from '@/components/AnimatedButton';

interface DashboardProps {
  onLogout: () => void;
}

interface Appointment {
  id: number;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes: string;
  status: string;
  createdAt: string;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments] = useState<Appointment[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('danmedy_appointments');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'vitals', label: 'My Vitals', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const vitalHistory = [
    { date: 'Apr 1', heartRate: 72, bp: '120/80', temp: 36.8 },
    { date: 'Apr 5', heartRate: 75, bp: '118/78', temp: 36.9 },
    { date: 'Apr 10', heartRate: 70, bp: '122/82', temp: 36.7 },
    { date: 'Apr 15', heartRate: 73, bp: '119/79', temp: 36.8 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-[#1DA1F2] to-[#0a1e3f] rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Welcome back, Ezenewu Great!</h2>
              <p className="text-white/80">Here's your health overview for today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#e6f7ff] rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-[#1DA1F2]" />
                </div>
                <p className="text-3xl font-bold text-[#0a1e3f]">{appointments.length}</p>
                <p className="text-gray-500">Upcoming Appointments</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-[#0a1e3f]">72</p>
                <p className="text-gray-500">Avg Heart Rate (bpm)</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-[#0a1e3f]">120/80</p>
                <p className="text-gray-500">Last BP Reading</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-3xl font-bold text-[#0a1e3f]">98%</p>
                <p className="text-gray-500">Health Score</p>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#0a1e3f]">Upcoming Appointments</h3>
                <button 
                  onClick={() => setActiveTab('appointments')}
                  className="text-[#1DA1F2] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {appointments.length > 0 ? (
                  appointments.slice(0, 3).map((apt) => (
                    <div 
                      key={apt.id} 
                      className="p-6 flex items-center gap-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedAppointment(apt)}
                    >
                      <img
                        src={apt.doctorImage}
                        alt={apt.doctorName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#0a1e3f]">{apt.doctorName}</h4>
                        <p className="text-[#1DA1F2] text-sm">{apt.doctorSpecialty}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {apt.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {apt.time}
                          </span>
                        </div>
                      </div>
                      <span className={cn(
                        'px-3 py-1 rounded-full text-sm font-medium uppercase',
                        apt.status === 'confirmed' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      )}>
                        {apt.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming appointments found.</p>
                    <Link to="/" className="text-[#1DA1F2] font-medium hover:underline mt-2 inline-block">
                      Book your first appointment
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Vitals */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#0a1e3f]">Recent Vital Signs</h3>
                <button 
                  onClick={() => setActiveTab('vitals')}
                  className="text-[#1DA1F2] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Heart Rate</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Blood Pressure</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Temperature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vitalHistory.map((vital, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-[#0a1e3f]">{vital.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{vital.heartRate} bpm</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{vital.bp} mmHg</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{vital.temp}°C</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0a1e3f]">My Appointments</h2>
              <Link to="/#doctors">
                <AnimatedButton variant="primary" size="md">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book New
                </AnimatedButton>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {appointments.length > 0 ? (
                appointments.map((apt) => (
                  <div 
                    key={apt.id} 
                    className="p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    <div className="flex items-start gap-6">
                      <img
                        src={apt.doctorImage}
                        alt={apt.doctorName}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-[#0a1e3f]">{apt.doctorName}</h4>
                            <p className="text-[#1DA1F2]">{apt.doctorSpecialty}</p>
                          </div>
                          <span className={cn(
                            'px-3 py-1 rounded-full text-sm font-medium uppercase',
                            apt.status === 'confirmed' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-yellow-100 text-yellow-600'
                          )}>
                            {apt.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-[#1DA1F2]" />
                            <span>{apt.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-[#1DA1F2]" />
                            <span>{apt.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <FileText className="w-4 h-4 text-[#1DA1F2]" />
                            <span>Consultation</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#0a1e3f]">No Appointments Yet</h3>
                  <p className="text-gray-500 mt-2">You haven't booked any appointments with our specialists.</p>
                  <Link to="/" className="mt-6 inline-block">
                    <AnimatedButton variant="primary" size="lg">
                      Book Your First Appointment
                    </AnimatedButton>
                  </Link>
                </div>
              )}
            </div>
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0a1e3f]">My Vital Signs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-[#0a1e3f] mb-4">Heart Rate History</h3>
                <div className="h-48 flex items-end gap-2">
                  {[72, 75, 70, 73, 71, 74, 72].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#1DA1F2] rounded-t-lg transition-all hover:bg-[#0a1e3f]"
                      style={{ height: `${(val / 100) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-[#0a1e3f] mb-4">Blood Pressure</h3>
                <div className="space-y-4">
                  {vitalHistory.map((vital, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-gray-600">{vital.date}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: '70%' }}
                          />
                        </div>
                        <span className="font-medium text-[#0a1e3f] w-20">{vital.bp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0a1e3f]">My Profile</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-[#e6f7ff] rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-[#1DA1F2]" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[#0a1e3f]">Ezenewu Great</h3>
                  <p className="text-gray-500">Patient ID: #DM123456</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <div className="flex items-center gap-2 text-[#0a1e3f]">
                    <Mail className="w-4 h-4 text-gray-400" />
                    ezenewu.great@email.com
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  <div className="flex items-center gap-2 text-[#0a1e3f]">
                    <Phone className="w-4 h-4 text-gray-400" />
                    +1 (555) 123-4567
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                  <div className="flex items-center gap-2 text-[#0a1e3f]">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    123 Health Street, Medical City
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                  <div className="flex items-center gap-2 text-[#0a1e3f]">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    January 15, 1985
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#0a1e3f]">Settings</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-[#0a1e3f]">Notifications</h3>
                <p className="text-gray-500 text-sm mt-1">Manage your notification preferences</p>
              </div>
              <div className="p-6 space-y-4">
                {['Appointment reminders', 'Health tips', 'Medication alerts', 'Newsletter'].map((item) => (
                  <label key={item} className="flex items-center justify-between cursor-pointer">
                    <span className="text-[#0a1e3f]">{item}</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-[#1DA1F2] focus:ring-[#1DA1F2]" />
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedAppointment(null)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0a1e3f]">Appointment Details</h3>
                    <p className="text-sm text-gray-500">ID: #{selectedAppointment.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAppointment(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Doctor Info */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <img 
                    src={selectedAppointment.doctorImage} 
                    alt={selectedAppointment.doctorName}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Specialist</p>
                    <h4 className="font-bold text-[#0a1e3f]">{selectedAppointment.doctorName}</h4>
                    <p className="text-sm text-[#1DA1F2] font-semibold">{selectedAppointment.doctorSpecialty}</p>
                  </div>
                </div>

                {/* Appointment Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Date</span>
                    </div>
                    <p className="font-bold text-[#0a1e3f]">{selectedAppointment.date}</p>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Time</span>
                    </div>
                    <p className="font-bold text-[#0a1e3f]">{selectedAppointment.time}</p>
                  </div>
                </div>

                {/* Patient Notes */}
                <div className="p-4 border border-gray-100 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Info className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Reason / Notes</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedAppointment.notes || "No additional notes provided."}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setSelectedAppointment(null)}
                    className="flex-1 py-4 bg-[#0a1e3f] text-white font-bold rounded-2xl hover:bg-[#1DA1F2] transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-5 h-0.5 bg-gray-600 mb-1" />
              <div className="w-5 h-0.5 bg-gray-600 mb-1" />
              <div className="w-5 h-0.5 bg-gray-600" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1DA1F2] rounded-lg flex items-center justify-center text-white font-bold">
                D
              </div>
              <span className="text-xl font-semibold text-[#0a1e3f]">DANMEDY</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 bg-[#e6f7ff] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#1DA1F2]" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          'fixed lg:sticky top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto transition-transform z-30',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}>
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors',
                    activeTab === item.id
                      ? 'bg-[#e6f7ff] text-[#1DA1F2]'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
