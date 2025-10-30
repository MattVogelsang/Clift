export function ComparisonTable() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CareerLift vs Traditional Job Search
          </h2>
          <p className="text-xl text-gray-600">
            See why thousands choose automation over manual applications
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-2 border-gray-200 rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-primary-600 to-primary-700">
                <th className="py-5 px-6 text-left text-white font-bold text-lg">Feature</th>
                <th className="py-5 px-6 text-center text-white font-bold text-lg">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">😤</span>
                    <span>Manual Search</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-center text-white font-bold text-lg bg-primary-800">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">🚀</span>
                    <span>CareerLift</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold text-gray-900">
                  Applications per week
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  5-15
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-600 bg-primary-50">
                  50-200+
                </td>
              </tr>
              
              <tr className="border-b-2 border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold text-gray-900">
                  Time spent applying daily
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  2-4 hours
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-600 bg-primary-50">
                  5 minutes
                </td>
              </tr>

              <tr className="border-b-2 border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold text-gray-900">
                  Cover letter writing
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  Manual (repetitive)
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-600 bg-primary-50">
                  AI-generated & personalized
                </td>
              </tr>

              <tr className="border-b-2 border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold text-gray-900">
                  Job tracking
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  Spreadsheet chaos
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-600 bg-primary-50">
                  Automated dashboard
                </td>
              </tr>

              <tr className="border-b-2 border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold text-gray-900">
                  New job alerts
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  Check manually
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-600 bg-primary-50">
                  24/7 automated scanning
                </td>
              </tr>

              <tr className="border-b-2 border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold text-gray-900">
                  Response rate
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  2-5%
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-600 bg-primary-50">
                  15-25%
                </td>
              </tr>

              <tr className="border-b-2 border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold text-gray-900">
                  Average time to hire
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  3-6 months
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-600 bg-primary-50">
                  60 days
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold text-gray-900">
                  Cost per month
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  $0 (but 100+ hours)
                </td>
                <td className="py-4 px-6 text-center font-bold text-primary-600 bg-primary-50">
                  $79.99
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-green-50 border-2 border-green-200 rounded-2xl p-8">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              The Math is Simple
            </h3>
            <p className="text-gray-700 max-w-2xl">
              Spend $79.99/month to save 100+ hours and get hired 10x faster. 
              That's worth thousands in opportunity cost alone!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

