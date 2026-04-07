import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { aiDiagnosisConfig } from '@/config';
import { Activity, Brain, AlertCircle, CheckCircle, Info, Loader2 } from 'lucide-react';
import { AnimatedButton } from '@/components/AnimatedButton';

interface DiagnosisResult {
  status: 'normal' | 'warning' | 'critical';
  message: string;
  recommendations: string[];
}

export function AIDiagnosis() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [vitals, setVitals] = useState<Record<string, number>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVitalChange = (name: string, value: string) => {
    setVitals(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const analyzeVitals = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const hr = vitals['Heart Rate'] || 75;
      const sys = vitals['Blood Pressure Systolic'] || 120;
      const dia = vitals['Blood Pressure Diastolic'] || 80;
      const temp = vitals['Temperature'] || 37;
      const o2 = vitals['Oxygen Saturation'] || 98;
      const resp = vitals['Respiratory Rate'] || 16;

      let status: 'normal' | 'warning' | 'critical' = 'normal';
      const issues: string[] = [];
      const recommendations: string[] = [];

      if (hr < 60 || hr > 100) {
        status = 'warning';
        issues.push('heart rate');
        recommendations.push('Monitor your heart rate and consult a cardiologist if persistent');
      }
      if (sys > 140 || dia > 90) {
        status = status === 'normal' ? 'warning' : 'critical';
        issues.push('blood pressure');
        recommendations.push('Consider lifestyle changes and consult your doctor about hypertension');
      }
      if (temp > 37.5) {
        status = status === 'normal' ? 'warning' : 'critical';
        issues.push('temperature');
        recommendations.push('Rest, stay hydrated, and monitor for other symptoms');
      }
      if (o2 < 95) {
        status = 'critical';
        issues.push('oxygen saturation');
        recommendations.push('Seek immediate medical attention - low oxygen levels');
      }
      if (resp < 12 || resp > 20) {
        status = status === 'normal' ? 'warning' : status;
        issues.push('respiratory rate');
        recommendations.push('Practice breathing exercises and monitor for breathing difficulties');
      }

      if (issues.length === 0) {
        setResult({
          status: 'normal',
          message: 'Your vital signs appear to be within normal ranges. Keep maintaining your healthy lifestyle!',
          recommendations: ['Continue regular health checkups', 'Maintain balanced diet', 'Exercise regularly'],
        });
      } else {
        setResult({
          status,
          message: `We detected some concerns with your ${issues.join(', ')}. ${status === 'critical' ? 'Please seek medical attention.' : 'Please monitor and consult a healthcare provider.'}`,
          recommendations,
        });
      }

      setIsAnalyzing(false);
    }, 2000);
  };

  const hasAllVitals = () => {
    return aiDiagnosisConfig.vitals.every(v => vitals[v.name] && vitals[v.name] > 0);
  };

  return (
    <section
      ref={sectionRef}
      id="ai-diagnosis"
      className="py-24 bg-gradient-to-br from-[#0a1e3f] via-[#0f2b5b] to-[#1DA1F2]"
    >
      <div className="w-full px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div>
            <span
              className={cn(
                'inline-block text-sm font-geist-mono uppercase tracking-[0.2em] text-[#1DA1F2] mb-4 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {aiDiagnosisConfig.label}
            </span>
            
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-100',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {aiDiagnosisConfig.heading}
            </h2>
            
            <p
              className={cn(
                'text-lg text-white/80 leading-relaxed mb-8 transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {aiDiagnosisConfig.description}
            </p>

            {/* Features */}
            <div
              className={cn(
                'space-y-4 transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-[#1DA1F2]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">AI-Powered Analysis</h4>
                  <p className="text-white/60 text-sm">Advanced algorithms analyze your vitals</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#1DA1F2]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Real-time Insights</h4>
                  <p className="text-white/60 text-sm">Get immediate health recommendations</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-[#1DA1F2]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Not Medical Advice</h4>
                  <p className="text-white/60 text-sm">Always consult healthcare professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div
            className={cn(
              'bg-white rounded-2xl p-8 shadow-2xl transition-all duration-1000 delay-200',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            )}
          >
            {!result ? (
              <>
                <h3 className="text-2xl font-bold text-[#0a1e3f] mb-6">
                  Enter Your Vitals
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {aiDiagnosisConfig.vitals.map((vital) => (
                    <div key={vital.name}>
                      <label className="block text-sm font-medium text-[#0a1e3f] mb-2">
                        {vital.name}
                        <span className="text-gray-400 text-xs ml-1">({vital.unit})</span>
                      </label>
                      <input
                        type="number"
                        min={vital.min}
                        max={vital.max}
                        step={vital.name === 'Temperature' ? 0.1 : 1}
                        placeholder={`Normal: ${vital.normal}`}
                        value={vitals[vital.name] || ''}
                        onChange={(e) => handleVitalChange(vital.name, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>

                <AnimatedButton
                  onClick={analyzeVitals}
                  disabled={!hasAllVitals() || isAnalyzing}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Analyze My Vitals
                    </>
                  )}
                </AnimatedButton>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  <Info className="w-3 h-3 inline mr-1" />
                  This tool provides preliminary insights only. Always consult a doctor for medical advice.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div
                  className={cn(
                    'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6',
                    result.status === 'normal' && 'bg-green-100',
                    result.status === 'warning' && 'bg-yellow-100',
                    result.status === 'critical' && 'bg-red-100'
                  )}
                >
                  {result.status === 'normal' && <CheckCircle className="w-10 h-10 text-green-600" />}
                  {result.status === 'warning' && <AlertCircle className="w-10 h-10 text-yellow-600" />}
                  {result.status === 'critical' && <AlertCircle className="w-10 h-10 text-red-600" />}
                </div>

                <h3
                  className={cn(
                    'text-2xl font-bold mb-4',
                    result.status === 'normal' && 'text-green-600',
                    result.status === 'warning' && 'text-yellow-600',
                    result.status === 'critical' && 'text-red-600'
                  )}
                >
                  {result.status === 'normal' && 'Looking Good!'}
                  {result.status === 'warning' && 'Attention Needed'}
                  {result.status === 'critical' && 'Seek Medical Attention'}
                </h3>

                <p className="text-gray-600 mb-6">{result.message}</p>

                <div className="text-left bg-gray-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-[#0a1e3f] mb-3">Recommendations:</h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#1DA1F2] flex-shrink-0 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <AnimatedButton
                  onClick={() => {
                    setResult(null);
                    setVitals({});
                  }}
                  variant="outline"
                  size="md"
                >
                  Check Again
                </AnimatedButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
