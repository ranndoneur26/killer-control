import React from 'react';
import { X, Lock, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const SECTIONS = [
  {
    n: '1', title: 'Data Controller',
    body: `The data controller for personal data collected through Killer Control is Marc Xicola Tugas, located at C/ Pau Claris 15, baixos. 08100 Mollet del Vallès, NIF/CIF 52172995w, and email digitalformacio@gmail.com.`,
  },
  {
    n: '2', title: 'Purpose of Processing',
    body: `The user's personal data may be processed for the following purposes:\n• Create and manage their user account.\n• Allow access to the platform and its features.\n• Register and organize their subscriptions and recurring expenses.\n• Send alerts, reminders, and notifications related to renewals, payments, or expirations.\n• Manage hiring, payments, billing, and premium plans.\n• Provide technical support and user assistance.\n• Improve security, performance, and user experience.\n• Comply with legal obligations.\n• Send informative or commercial communications, when there is consent or sufficient legal basis.`,
  },
  {
    n: '3', title: 'Data We Collect',
    body: `We may collect the following categories of data:\n• Identification data: name, surname, alias, or username.\n• Contact data: email and, where applicable, telephone.\n• Access data: encrypted password, session identifiers, or third-party authentication data.\n• Usage data: activity on the platform, preferences, events, technical logs, IP, browser, device, and OS.\n• Subscription data: service name, category, amount, frequency, registration and renewal dates, associated payment method, configured alerts, and user notes.\n• Billing data: tax address, payment history, and premium subscription status.\n• Communications: queries, incidents, or requests submitted by the user.`,
  },
  {
    n: '4', title: 'Data Origin',
    body: `Data may come from:\n• Information provided directly by the user.\n• Use of the platform.\n• Authentication providers such as Google or others.\n• Payment providers such as Stripe or others.\n• Integrations expressly activated by the user.`,
  },
  {
    n: '5', title: 'Legal Basis for Processing',
    body: `We process personal data based on:\n• The execution of the contract or pre-contractual measures, when the user registers or uses the service.\n• The user's consent, when necessary.\n• Compliance with legal obligations.\n• The legitimate interest of Marc Xicola, for example, to improve security, prevent abuse, or optimize the service, provided that such interest does not prevail over the user's rights.`,
  },
  {
    n: '6', title: 'Data Retention',
    body: `Data will be kept for the time necessary to fulfill the purpose for which they were collected.\n\nSubsequently, they may be kept blocked during the legal periods required to address possible liabilities.\n\nWhen the user requests the deletion of their account, their data will be deleted or anonymized except for those that must be kept by legal obligation.`,
  },
  {
    n: '7', title: 'Recipients and Data Processors',
    body: `Data may be accessible by providers who provide services necessary for the operation of the platform, such as:\n• Hosting and cloud infrastructure.\n• Authentication.\n• Analytics.\n• Email and notifications.\n• Customer service.\n• Payments and billing.\n• Storage and databases.\n\nAmong such providers may be Firebase, Google Cloud, Stripe, Resend, PostHog, or others. These third parties will act as data processors or independent controllers, as appropriate.`,
  },
  {
    n: '8', title: 'International Transfers',
    body: `In case of using providers located outside the European Economic Area, data may be subject to international transfers.\n\nMarc Xicola will adopt the appropriate guarantees required by applicable regulations, such as standard contractual clauses or equivalent mechanisms.`,
  },
  {
    n: '9', title: 'User Rights',
    body: `The user can exercise their rights of:\n• Access\n• Rectification\n• Deletion ("right to be forgotten")\n• Opposition\n• Limitation of processing\n• Portability\n• Withdrawal of consent at any time\n\nTo exercise them, write to digitalformacio@gmail.com indicating your full name, the right you wish to exercise, and your account identification data.\n\nLikewise, you can file a claim with the competent supervisory authority in your country.`,
  },
  {
    n: '10', title: 'Information Security',
    body: `Marc Xicola applies reasonable technical and organizational measures to protect personal data against loss, unauthorized access, alteration, or improper disclosure.\n\nHowever, the user acknowledges that no security measure on the internet is absolutely infallible.`,
  },
  {
    n: '11', title: 'Minors',
    body: `The platform is not directed at minors under 18 years of age, unless expressly stated otherwise.\n\nIf Marc Xicola detects that it has collected data from a minor without sufficient legitimate basis, it may proceed to its deletion.`,
  },
  {
    n: '12', title: 'Cookies and Similar Technologies',
    body: `The platform may use cookies or similar technologies for technical, analytical, personalization, or measurement purposes.\n\nThe user can obtain more information in the platform's Cookie Policy.`,
  },
  {
    n: '13', title: 'Commercial Communications',
    body: `Commercial communications will only be sent when:\n• The user has given their consent.\n• There is a prior relationship and applicable regulations allow it.\n• A simple mechanism to unsubscribe is offered at all times.\n\nThe user may withdraw their consent by writing to Killercontrolsupport@gmail.com or using the link included in each communication.`,
  },
  {
    n: '14', title: 'Automated Decisions and Profiling',
    body: `The platform may use automated logic to offer savings recommendations, renewal alerts, or prioritization of information based on the user's subscription history.\n\nIn such cases, the data used are those entered by the user on the platform, with the purpose of optimizing their recurring expense management, without generating negative legal effects on the user.`,
  },
  {
    n: '15', title: 'Changes to this Policy',
    body: `Marc Xicola may update this Privacy Policy to adapt it to regulatory, technical, or functional changes.\n\nWhen changes are relevant, they will be communicated by reasonable means: notice on the web, within the app, or by email.`,
  },
  {
    n: '16', title: 'Contact',
    body: `For any questions about privacy or data protection:\n\n• Controller: Marc Xicola\n• Privacy Email: digitalformacio@gmail.com\n• Address: C/ Pau Claris 15, baixos. 08100 Mollet del Vallès`,
  },
];

export default function PrivacyModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="bg-[#07101E] border border-[#1e293b] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl flex flex-col max-h-[92vh]"
          >
            {/* ── Header ── */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[#1e293b] shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <Lock size={20} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg leading-tight">Privacy Policy</h2>
                <p className="text-xs text-gray-500 mt-0.5"><span className="text-[#F59E0B]">Killer</span> Control · Last update: March 2026</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition shrink-0"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6 no-scrollbar">
              {/* Intro badge */}
              <div className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/15 rounded-2xl px-4 py-3">
                <ShieldCheck size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  Your privacy is important to us. This document explains what data we collect, how we use it, and what rights you have over it.
                </p>
              </div>

              {SECTIONS.map(s => (
                <div key={s.n} className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full shrink-0">
                      Art. {s.n}
                    </span>
                    <h3 className="font-bold text-white text-sm">{s.title}</h3>
                  </div>
                  <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-line border-l-2 border-[#1e293b] pl-4">
                    {s.body.split('Killer').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-[#F59E0B] font-bold">Killer</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Footer ── */}
            <div className="px-6 py-4 border-t border-[#1e293b] shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold rounded-2xl py-3.5 hover:bg-blue-500/20 transition text-sm"
              >
                Understood, close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}