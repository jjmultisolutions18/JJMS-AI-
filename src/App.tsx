import * as React from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { InnovationForm } from './components/InnovationForm';
import { DocumentTools } from './components/DocumentTools';
import { ProgrammeManagerTools } from './components/ProgrammeManagerTools';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Info, ExternalLink, Hammer, TrendingUp, LogOut, Loader2 } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useAuth } from './components/FirebaseProvider';
import { Login } from './components/Login';
import { auth } from './lib/firebase';
import { Button } from '@/components/ui/button';

export default function App() {
  const { user, loading, role } = useAuth();
  const [activeTab, setActiveTab] = React.useState('chat');
  const [initialPrompt, setInitialPrompt] = React.useState<string | null>(null);

  const handleFormSubmit = (prompt: string) => {
    setInitialPrompt(prompt);
    setActiveTab('chat');
  };

  const handleSignOut = () => auth.signOut();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-4">
        <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading Innovation Portal...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-slate-800 capitalize">
                {activeTab.replace('-', ' ')}
              </h2>
              <div className="h-4 w-[1px] bg-slate-200" />
              <div className="flex flex-col">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight leading-tight">
                  {user.email}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                    {role || 'INNOVATOR'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded border border-green-100 uppercase tracking-tight">
                System Active
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                className="text-slate-500 hover:text-red-600 hover:bg-red-50 gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'chat' && (
              <ChatInterface 
                initialPrompt={initialPrompt} 
                onPromptHandled={() => setInitialPrompt(null)} 
              />
            )}

            {activeTab === 'innovation' && (
              <InnovationForm onSubmit={handleFormSubmit} />
            )}

            {activeTab === 'documents' && (
              <DocumentTools onSelect={handleFormSubmit} />
            )}

            {activeTab === 'programme' && (
              <ProgrammeManagerTools onSelect={handleFormSubmit} />
            )}

            {activeTab === 'sa-context' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-orange-600 mb-1">
                      <MapPin size={20} />
                      <span className="text-xs font-bold uppercase tracking-wider">South Africa Context</span>
                    </div>
                    <CardTitle>Key Innovation Institutions</CardTitle>
                    <CardDescription>
                      Resources and funding bodies for South African innovators.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'TIA', fullName: 'Technology Innovation Agency', desc: 'Funding and support for tech-based innovations.', url: 'https://www.tia.org.za' },
                      { name: 'SEDA', fullName: 'Small Enterprise Development Agency', desc: 'Business support and incubation services.', url: 'http://www.seda.org.za' },
                      { name: 'DTIC', fullName: 'Dept. of Trade, Industry & Competition', desc: 'Incentives and industrial development support.', url: 'http://www.thedtic.gov.za' },
                      { name: 'CIPC', fullName: 'Companies & Intellectual Property Commission', desc: 'Company registration and IP protection.', url: 'http://www.cipc.co.za' },
                    ].map((inst) => (
                      <div key={inst.name} className="p-4 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-900">{inst.name}</h4>
                          <a href={inst.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-600">
                            <ExternalLink size={14} />
                          </a>
                        </div>
                        <p className="text-[10px] text-slate-500 font-semibold mb-1">{inst.fullName}</p>
                        <p className="text-xs text-slate-600">{inst.desc}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-100">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-orange-600">
                      <Info size={18} />
                      <CardTitle className="text-sm">Innovation Programmes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4">
                      <li><strong>RISP:</strong> Regional Innovation Support Programme.</li>
                      <li><strong>Grassroots Innovation:</strong> Specific support for community-based innovators.</li>
                      <li><strong>Incubation:</strong> Sector-specific hubs (Agri, Digital, Manufacturing).</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'maker' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-orange-600 mb-1">
                      <Hammer size={20} />
                      <span className="text-xs font-bold uppercase tracking-wider">Maker Space Support</span>
                    </div>
                    <CardTitle>Prototyping & Fabrication</CardTitle>
                    <CardDescription>
                      Move your idea from concept to physical prototype using our maker space tools.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: '3D Printing', desc: 'Rapid prototyping for complex geometries using PLA/ABS.', prompt: 'I need help with 3D printing my prototype. What materials and design considerations should I keep in mind?' },
                      { name: 'Laser Cutting', desc: 'Precision cutting and engraving for wood, acrylic, and leather.', prompt: 'I want to use laser cutting for my prototype. Suggest a workflow and material selection.' },
                      { name: 'CNC Machining', desc: 'Subtractive manufacturing for wood, metal, and composites.', prompt: 'How can I use CNC machining to move my idea to a functional prototype?' },
                      { name: 'IoT & Electronics', desc: 'Arduino, Raspberry Pi, and sensor integration for smart solutions.', prompt: 'I am building an IoT solution. Suggest an electronics prototyping approach and basic components.' },
                    ].map((tool) => (
                      <div 
                        key={tool.name} 
                        className="p-4 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                        onClick={() => handleFormSubmit(tool.prompt)}
                      >
                        <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{tool.name}</h4>
                        <p className="text-xs text-slate-600 mt-1">{tool.desc}</p>
                        <div className="mt-3 flex items-center text-[10px] font-bold text-orange-600 uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-opacity">
                          Get Guidance →
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'business' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-orange-600 mb-1">
                      <TrendingUp size={20} />
                      <span className="text-xs font-bold uppercase tracking-wider">Business Development</span>
                    </div>
                    <CardTitle>Commercialisation Strategy</CardTitle>
                    <CardDescription>
                      Build a sustainable business model and identify your path to market.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Value Proposition', desc: 'Define exactly why customers should choose your solution.', prompt: 'Help me refine my Unique Value Proposition (UVP). What specific customer pains am I solving?' },
                      { name: 'Revenue Streams', desc: 'Identify how your innovation will generate sustainable income.', prompt: 'Suggest 3 potential revenue streams for my innovation, considering the South African market context.' },
                      { name: 'Market Segmentation', desc: 'Identify your primary, secondary, and tertiary target markets.', prompt: 'Help me identify my target market segments in South Africa, including underserved communities.' },
                      { name: 'Pricing Strategy', desc: 'Determine the best pricing model for your solution.', prompt: 'What pricing strategy should I use for my innovation to ensure both impact and sustainability?' },
                    ].map((tool) => (
                      <div 
                        key={tool.name} 
                        className="p-4 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                        onClick={() => handleFormSubmit(tool.prompt)}
                      >
                        <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{tool.name}</h4>
                        <p className="text-xs text-slate-600 mt-1">{tool.desc}</p>
                        <div className="mt-3 flex items-center text-[10px] font-bold text-orange-600 uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-opacity">
                          Get Guidance →
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

