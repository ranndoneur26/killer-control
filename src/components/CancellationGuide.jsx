import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, AlertTriangle, ExternalLink } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GUIDES = {
  '1': {
    name: 'Netflix',
    color: 'bg-[#E50914]',
    webUrl: 'https://www.netflix.com/account',
    estimatedTime: '2 min',
    steps: [
      {
        id: 1,
        text: 'Open a web browser and go to Netflix.com. Log in to your account.',
        darkPatternAlert: 'Netflix disables the cancellation button in its mobile app and SmartTV on purpose. It only works from the web browser.'
      },
      {
        id: 2,
        text: 'Click on your profile (top right corner) and select "Account".'
      },
      {
        id: 3,
        text: 'In the "Membership & Billing" section, click the gray "Cancel Membership" button.',
        darkPatternAlert: 'On this screen, discount offers or account pause options will appear. Ignore them and continue.'
      },
      {
        id: 4,
        text: 'Netflix will show you an emotional retention screen with your favorite series. Click "Finish Cancellation".',
        darkPatternAlert: 'This screen is designed to make you feel like you are losing something. Don\'t be swayed.'
      },
      {
        id: 5,
        text: 'You will receive a confirmation email. You will continue to have access until the end of the paid period.'
      }
    ]
  },
  '2': {
    name: 'Spotify',
    color: 'bg-[#1DB954]',
    webUrl: 'https://www.spotify.com/account/subscription/change/',
    estimatedTime: '3 min',
    steps: [
      {
        id: 1,
        text: 'Go to spotify.com from a web browser. Log in and go to "Account" > "Your plan".',
        darkPatternAlert: 'The Spotify mobile app does not allow canceling directly. Only from the web.'
      },
      {
        id: 2,
        text: 'Scroll down and click on "Change or cancel".'
      },
      {
        id: 3,
        text: 'Select "Cancel Premium".',
        darkPatternAlert: 'Spotify will offer to pause the subscription for 1-3 months for free instead of canceling. It is a trap so you forget to cancel.',
      },
      {
        id: 4,
        text: 'Choose the cancellation reason (mandatory) and confirm with "Cancel Premium".'
      },
      {
        id: 5,
        text: 'Confirm a second time in the pop-up window. Your account will switch to the free plan with ads at the end of the period.'
      }
    ]
  },
  '3': {
    name: 'Xbox Game Pass',
    color: 'bg-[#107C10]',
    webUrl: 'https://account.microsoft.com/services',
    estimatedTime: '4 min',
    steps: [
      {
        id: 1,
        text: 'Go to account.microsoft.com/services and log in with your Microsoft account.'
      },
      {
        id: 2,
        text: 'Locate "Xbox Game Pass Ultimate" (or your plan) and click "Cancel".',
        darkPatternAlert: 'Microsoft hides the cancellation button behind several service pages. Be persistent.'
      },
      {
        id: 3,
        text: 'Select the cancellation reason and ignore the discounts or free extensions they offer you.',
        darkPatternAlert: 'Microsoft frequently offers 1-3 months of free extension so you forget to cancel later.'
      },
      {
        id: 4,
        text: 'Confirm the cancellation. You will have access until the renewal date already paid.'
      },
      {
        id: 5,
        text: 'You will receive a confirmation email from Microsoft. Save it as proof.'
      }
    ]
  },
  '4': {
    name: 'Sanitas Dental Insurance',
    color: 'bg-[#005EB8]',
    webUrl: 'https://www.sanitas.es/particulares/atencion-al-cliente/',
    estimatedTime: '10-15 min',
    steps: [
      {
        id: 1,
        text: 'Check FIRST the end date of your contract\'s lock-in period. If you have months left, you could have a financial penalty for early cancellation.',
        darkPatternAlert: 'Sanitas and other health insurances include 12-month lock-in periods. Canceling earlier can cost up to 2-3 additional installments.'
      },
      {
        id: 2,
        text: 'With the lock-in period expired: call 91 175 00 00 (Sanitas commercial attention). Explicitly ask for "insurance cancellation".'
      },
      {
        id: 3,
        text: 'The agent will try to offer you discounts, plan changes, or pauses. Maintain your decision and repeat: "I want to cancel policy number [X]".',
        darkPatternAlert: 'Agents have a retention commission. It is common to receive 3-5 retention attempts in a single call.'
      },
      {
        id: 4,
        text: 'Demand a reference number and confirmation of the cancellation in writing (email or letter). Without this, the cancellation might not be processed.'
      },
      {
        id: 5,
        text: 'If they deny telephone cancellation, send a certified fax or letter to Sanitas Seguros, C/ Ribera del Loira 52, Madrid, indicating: policy number, your data, and the effective date of cancellation.'
      }
    ]
  },
  '5': {
    name: 'Movistar Fusión+',
    color: 'bg-[#009FDB]',
    webUrl: 'https://www.movistar.es/particulares/atencion-al-cliente/',
    estimatedTime: '15-20 min',
    steps: [
      {
        id: 1,
        text: 'Check your contract to verify the end date of the lock-in period. The lock-in period in Movistar is usually 18-24 months in packs.',
        darkPatternAlert: 'Movistar charges penalties of up to 150-300€ for early cancellation. Verify in "My Movistar" > "My contract".'
      },
      {
        id: 2,
        text: 'Call 1004 (Movistar Customer Service, free). Ask to speak with the "Cancellations" department.',
        darkPatternAlert: 'The first agent will try to transfer you to retention. Ask directly for the cancellation department to speed up.'
      },
      {
        id: 3,
        text: 'Indicate the service you want to cancel (Fiber, Mobile, TV). If it is the complete pack, specify "cancellation of all services".',
        darkPatternAlert: 'They will offer discounts of up to 50% for 3-6 months or free services. It is valid to accept if you want, but if you want to leave, don\'t yield.'
      },
      {
        id: 4,
        text: 'If there is an active lock-in period, negotiate the penalty. Mention that there are better offers in the competition; it is common for them to reduce or eliminate the penalty.'
      },
      {
        id: 5,
        text: 'Request the reference number of the cancellation request and confirm the effective date. Write it down. The cancellation takes 24-48 business hours.'
      }
    ]
  },
  '6': {
    name: 'The New York Times',
    color: 'bg-gray-700',
    webUrl: 'https://www.nytimes.com/account/manage-subscription',
    estimatedTime: '5 min',
    steps: [
      {
        id: 1,
        text: 'Log in to nytimes.com with your account and go to "Account" > "Manage subscription".',
        darkPatternAlert: 'The cancellation link is not directly visible. You have to navigate to "Manage subscription" and look for the "Cancel Subscription" button.'
      },
      {
        id: 2,
        text: 'Click "Cancel Subscription". A form with the cancellation reason will appear.',
        darkPatternAlert: 'PROMO WARNING! If you are on a promotional rate ($1/month), cancel BEFORE the promo end date. One day later they will charge you the full price (up to $17/month).'
      },
      {
        id: 3,
        text: 'Indicate the reason. NYT will offer to pause the subscription for 8 weeks. Select "No thanks, cancel" to continue.',
        darkPatternAlert: 'The 8-week pause is harmless, but it will automatically restart at full price when it ends.'
      },
      {
        id: 4,
        text: 'Confirm the cancellation. You will receive access until the end of the paid period.'
      },
      {
        id: 5,
        text: 'Check your email. You will receive the cancellation confirmation from do-not-reply@nytimes.com. Save it.'
      }
    ]
  },
  '7': {
    name: 'Password Manager',
    color: 'bg-gray-600',
    webUrl: 'https://vault.bitwarden.com/#/settings/subscription',
    estimatedTime: '3 min',
    steps: [
      {
        id: 1,
        text: 'BEFORE CANCELING: export all your passwords. In Bitwarden: go to "Tools" > "Export Vault". Save the file in a secure place.',
        darkPatternAlert: 'If you cancel without exporting, you will lose access to your premium passwords. The free plan keeps basic passwords but loses premium features.'
      },
      {
        id: 2,
        text: 'Go to vault.bitwarden.com and log in. Go to "Settings" > "Subscription".'
      },
      {
        id: 3,
        text: 'Click "Cancel Premium". Bitwarden will confirm that you switch to the free plan.'
      },
      {
        id: 4,
        text: 'Confirm the cancellation. Your premium account will continue active until the end of the billed period.'
      },
      {
        id: 5,
        text: 'You will receive a confirmation email. Bitwarden\'s free plan is generous and remains secure and functional.'
      }
    ]
  }
};

export default function CancellationGuide() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  const guide = GUIDES[id] || GUIDES['1'];

  const handleNext = () => {
    if (currentStep < guide.steps.length) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const handleFinish = () => {
    navigate('/subscriptions');
  };

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-lg mx-auto bg-[#F8FAFC] text-[#0F172A] pb-10">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-[#E2E8F0] rounded-xl transition text-[#0F172A]">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black tracking-tight">Definitive Cancellation Guide</h1>
      </header>

      {/* Provider Info */}
      <div className={`${guide.color} text-white p-6 rounded-3xl mb-8 flex items-center justify-between shadow-lg`}>
        <div>
          <h2 className="text-2xl font-bold mb-1">{guide.name}</h2>
          <p className="opacity-90 text-sm font-medium">Est. time {guide.estimatedTime}</p>
        </div>
        <a
          href={guide.webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-semibold backdrop-blur-sm transition flex gap-2 items-center shrink-0"
        >
          Open Web <ExternalLink size={16} />
        </a>
      </div>

      {/* Steps */}
      <div className="flex-1">
        <div className="mb-4 flex justify-between items-end">
          <h3 className="font-black text-lg text-[#0F172A]">Step by step</h3>
          <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider">{currentStep}/{guide.steps.length} Completed</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full mb-6">
          <motion.div
            className="h-1.5 bg-[#4F46E5] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
            animate={{ width: `${(currentStep / guide.steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {guide.steps.map((step, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              const isFuture = index > currentStep;

              if (isFuture && index > currentStep + 1) return null;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-3xl border transition-all duration-300 ${
                    isActive ? 'bg-white border-[#4F46E5] shadow-lg shadow-indigo-100/50' :
                    isPast ? 'bg-white border-[#E2E8F0] opacity-60' :
                    'bg-[#F1F5F9] border-[#E2E8F0] opacity-50 blur-[1px]'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      isPast ? 'bg-[#4F46E5] text-white' : isActive ? 'bg-[#EEF2FF] border-2 border-[#4F46E5] text-[#4F46E5]' : 'bg-[#E2E8F0] text-[#94A3B8]'
                    }`}>
                      {isPast ? <CheckCircle2 size={16} /> : <span className="text-xs font-black">{index + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium leading-relaxed ${isActive ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>
                        {step.text}
                      </p>

                      {step.darkPatternAlert && (isActive || isPast) && (
                        <div className="mt-3 bg-[#FEF2F2] border border-[#EF4444]/20 text-[#EF4444] p-3 rounded-2xl flex gap-2 items-start text-sm group">
                          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                          <p className="leading-snug"><strong className="font-black uppercase tracking-tight text-[10px] block mb-0.5 opacity-80">Beware of manipulation</strong> {step.darkPatternAlert}</p>
                        </div>
                      )}

                      {isActive && currentStep < guide.steps.length && (
                        <button
                          onClick={handleNext}
                          className="mt-4 px-6 py-3 bg-[#4F46E5] text-white font-black rounded-2xl flex items-center gap-2 hover:bg-[#4338CA] transition shadow-lg shadow-indigo-100 uppercase tracking-tight text-sm"
                        >
                          Done, next <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Completion */}
      <AnimatePresence>
        {currentStep === guide.steps.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-sm"
          >
            <div className="w-16 h-16 bg-[#EEF2FF] text-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] mb-2 tracking-tight">Cancellation Completed!</h3>
            <p className="text-sm text-[#64748B] font-medium mb-6">One less expense. More money for what matters.</p>
            <button
              onClick={handleFinish}
              className="w-full bg-[#0F172A] border border-[#0F172A] font-black uppercase tracking-widest text-[11px] rounded-2xl py-4 text-white hover:bg-black transition shadow-lg"
            >
              Back to my subscriptions
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}