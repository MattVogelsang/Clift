export function ComparisonTable() {
  return (
    <section className="relative py-32 px-6 md:px-8 bg-gradient-to-b from-background-dark to-neutral-900 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            <span className="text-white">CareerLift vs</span>{' '}
            <span className="text-gradient">Traditional Job Search</span>
          </h2>
          <p className="text-xl text-neutral-300 leading-relaxed">
            See why thousands choose automation over manual applications
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 backdrop-blur-sm">
            <thead>
              <tr className="bg-neutral-800/50 border-b border-neutral-700">
                <th className="py-5 px-6 text-left text-white font-bold text-lg">Feature</th>
                <th className="py-5 px-6 text-center text-white font-bold text-lg">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">😤</span>
                    <span>Manual Search</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-center text-white font-bold text-lg bg-gradient-primary/20 border-l border-primary-500/30">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">🚀</span>
                    <span>CareerLift</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-white">
                  Applications per week
                </td>
                <td className="py-4 px-6 text-center text-neutral-400">
                  5-15
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-400 bg-gradient-primary/10">
                  50-200+
                </td>
              </tr>
              
              <tr className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-white">
                  Time spent applying daily
                </td>
                <td className="py-4 px-6 text-center text-neutral-400">
                  2-4 hours
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-400 bg-gradient-primary/10">
                  5 minutes
                </td>
              </tr>

              <tr className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-white">
                  Cover letter writing
                </td>
                <td className="py-4 px-6 text-center text-neutral-400">
                  Manual (repetitive)
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-400 bg-gradient-primary/10">
                  AI-generated & personalized
                </td>
              </tr>

              <tr className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-white">
                  Job tracking
                </td>
                <td className="py-4 px-6 text-center text-neutral-400">
                  Spreadsheet chaos
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-400 bg-gradient-primary/10">
                  Automated dashboard
                </td>
              </tr>

              <tr className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-white">
                  New job alerts
                </td>
                <td className="py-4 px-6 text-center text-neutral-400">
                  Check manually
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-400 bg-gradient-primary/10">
                  24/7 automated scanning
                </td>
              </tr>

              <tr className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-white">
                  Response rate
                </td>
                <td className="py-4 px-6 text-center text-neutral-400">
                  2-5%
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-400 bg-gradient-primary/10">
                  15-25%
                </td>
              </tr>

              <tr className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-white">
                  Average time to hire
                </td>
                <td className="py-4 px-6 text-center text-neutral-400">
                  3-6 months
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-400 bg-gradient-primary/10">
                  60 days
                </td>
              </tr>

              <tr className="hover:bg-neutral-800/30 transition-colors">
                <td className="py-4 px-6 font-semibold text-white">
                  Cost per month
                </td>
                <td className="py-4 px-6 text-center text-neutral-400">
                  $0 (but 100+ hours)
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-400 bg-gradient-primary/10">
                  $79.99
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block card-premium max-w-2xl">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              <span className="text-white">The Math is</span>{' '}
              <span className="text-gradient">Simple</span>
            </h3>
            <p className="text-neutral-300 leading-relaxed">
              Spend $79.99/month to save 100+ hours and get hired 10x faster. 
              That's worth thousands in opportunity cost alone!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

