import React from 'react';
import { X, Shield, ScrollText } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const SECTIONS = [
  {
    n: '1', title: 'Owner Identification',
    body: `These Terms and Conditions regulate the access, navigation, and use of the website, application, and services associated with Killer Control, owned by Marc Xicola Tugas, located at C/ Pau Claris 15, baixos. 08100 Mollet del Vallès, NIF/CIF 52172995w, and contact email Killercontrolsupport@gmail.com.`,
  },
  {
    n: '2', title: 'Service Object',
    body: `Killer Control is a digital platform designed to help users centralize, visualize, analyze, and manage their subscriptions, recurring expenses, renewal alerts, and cancellation information processes.\n\nThe platform may offer features such as: manual subscription tracking, control panels and statistics, alerts and reminders, spending optimization recommendations, informative guides for cancelling services, and access to premium paid features, where applicable.\n\nThe use of the platform does not constitute professional financial, legal, or tax advice, unless expressly stated otherwise.`,
  },
  {
    n: '3', title: 'Acceptance of Conditions',
    body: `Access to or use of the platform attributes the condition of user and implies full acceptance of these Terms and Conditions, as well as the Privacy Policy.\n\nIf the user does not agree with these texts, they must refrain from using the platform.`,
  },
  {
    n: '4', title: 'Usage Requirements',
    body: `To use certain services, the user must:\n• Be over 18 years old, or have valid authorization from their legal representatives.\n• Provide truthful, current, and complete information.\n• Diligently safeguard their access credentials.\n• Not use the platform for illicit, fraudulent, or bad faith purposes.\n\nThe user is responsible for all activities carried out from their account, unless there is proof of unauthorized use by third parties.`,
  },
  {
    n: '5', title: 'Account Registration',
    body: `Some features may require creating an account using an email and password, third-party login, or any other system enabled by the platform.\n\nThe user agrees to: not impersonate third parties, not create false accounts, keep their data updated, and immediately notify of any unauthorized access to Killercontrolsupport@gmail.com.`,
  },
  {
    n: '6', title: 'Service Description and Limits',
    body: `The platform is informative, organizational, and supportive of personal subscription management.\n\nUnless expressly stated:\n• Killer Control does not act as a banking entity.\n• Killer Control does not execute cancellations on behalf of the user regarding third parties.\n• Killer Control does not guarantee that all external providers keep their conditions, prices, interfaces, or cancellation processes unchanged.\n• Killer Control does not replace the direct review of contracts signed by the user with third parties.\n\nGuides, alerts, calculations, and recommendations are offered as guidance.`,
  },
  {
    n: '7', title: 'Plans, Prices, and Payments',
    body: `Access to certain features may be subject to payment of a subscription or fee.\n\nIn such case:\n• The applicable price will be the one published at the time of contracting.\n• The billing frequency will be monthly or annual according to the selected plan.\n• Payments will be processed through Stripe or the provider indicated at any time.\n• The user authorizes recurring billing when contracting a subscription plan.\n\nUnless stated otherwise, amounts are expressed in Euros and include applicable taxes as informed during the purchase process.`,
  },
  {
    n: '8', title: 'Renewal, Cancellation, and Refunds',
    body: `Paid subscriptions will automatically renew at the end of each period, unless previously cancelled by the user within the period indicated on the platform.\n\nThe user may cancel their plan from the "My Account" section of the application.\n\nCancellation will prevent future charges but will not necessarily imply the automatic refund of amounts already paid, unless required by applicable law, there is a verifiable billing error, or a different commercial policy is expressly indicated.`,
  },
  {
    n: '9', title: 'User Obligations',
    body: `The user agrees not to:\n• Introduce false or third-party data without authorization.\n• Interfere with the technical operation of the platform.\n• Attempt to access restricted areas.\n• Copy, resell, or commercially exploit the service without written authorization.\n• Use the platform for illicit purposes or purposes that violate third-party rights.`,
  },
  {
    n: '10', title: 'Intellectual and Industrial Property',
    body: `All contents, designs, texts, logos, databases, interfaces, source code, trade names, and other elements of Killer Control are owned by Marc Xicola or are used with sufficient authorization.\n\nReproduction, distribution, transformation, public communication, or total or partial exploitation without prior written authorization is prohibited.`,
  },
  {
    n: '11', title: 'Third-Party Services and Links',
    body: `The platform may show, integrate, or link to third-party services, including payment providers, authentication, analytics, or links to external websites.\n\nKiller Control does not control or assume responsibility for the availability of such services, their privacy policies, their contractual conditions, or changes in their prices, interfaces, or procedures.`,
  },
  {
    n: '12', title: 'Exclusion of Guarantees',
    body: `The platform is offered "as is" and subject to availability.\n\nMarc Xicola does not guarantee that: the service is free of errors or interruptions, access is uninterrupted or completely secure, savings recommendations are accurate in all cases, or that data provided by third parties is complete, permanent, or updated.`,
  },
  {
    n: '13', title: 'Limitation of Liability',
    body: `To the maximum extent permitted by law, Marc Xicola shall not be liable for indirect damages, lost profits, loss of data, loss of opportunities, or damages derived from the use or inability to use the platform, errors introduced by the user, economic decisions adopted by the user, or actions of third-party providers.\n\nNothing in the foregoing shall limit liability when it cannot be legally excluded.`,
  },
  {
    n: '14', title: 'Account Suspension or Cancellation',
    body: `Killer Control may suspend or cancel accounts, temporarily or permanently, if it detects: breach of these Terms, fraudulent or abusive use, risk to system security, or legal or administrative requirement.`,
  },
  {
    n: '15', title: 'Data Protection',
    body: `The processing of personal data is governed by the platform's Privacy Policy, which forms an integral part of these Terms and Conditions.`,
  },
  {
    n: '16', title: 'Modifications',
    body: `Marc Xicola may modify these Terms and Conditions at any time for legal, technical, operational, or commercial reasons.\n\nWhen changes are relevant, the user will be informed by reasonable means: notice on the web, within the app, or by email.`,
  },
  {
    n: '17', title: 'Applicable Legislation and Jurisdiction',
    body: `These Terms and Conditions shall be governed by the legislation of Spain.\n\nFor any controversy, the parties submit to the courts and tribunals of Mollet del Vallès, unless applicable consumer regulations establish another mandatory forum.`,
  },
  {
    n: '18', title: 'Contact',
    body: `For any questions about these Terms and Conditions:\n\n• Owner: Marc Xicola\n• Email: Killercontrolsupport@gmail.com\n• Address: C/ Pau Claris 15, baixos. 08100 Mollet del Vallès`,
  },
];

export default function TermsModal({ open, onClose }) {
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
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl flex flex-col max-h-[92vh]"
          >
            {/* ── Header ── */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--border)] shrink-0">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ScrollText size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg leading-tight">Terms & Conditions</h2>
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

            {/* ── Scrollable body ── */}
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6 no-scrollbar">
              {/* Intro badge */}
              <div className="flex items-start gap-3 bg-[var(--primary)]/5 border border-[var(--primary)]/15 rounded-2xl px-4 py-3">
                <Shield size={16} className="text-[var(--primary)] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  Please read these terms carefully before using <span className="text-[#F59E0B]">Killer</span> Control. By accessing or using the platform, you agree to these conditions in their entirety.
                </p>
              </div>

              {/* Sections */}
              {SECTIONS.map(s => (
                <div key={s.n} className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full shrink-0">
                      Art. {s.n}
                    </span>
                    <h3 className="font-bold text-white text-sm">{s.title}</h3>
                  </div>
                  <div className="pl-0 text-sm text-gray-400 leading-relaxed whitespace-pre-line border-l-2 border-[var(--border)] pl-4">
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
            <div className="px-6 py-4 border-t border-[var(--border)] shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-[var(--primary)] text-[var(--bg)] font-bold rounded-2xl py-3.5 hover:opacity-90 transition text-sm"
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
