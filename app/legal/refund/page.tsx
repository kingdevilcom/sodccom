import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Compass, RotateCcw } from 'lucide-react'

export default function RefundPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Compass className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Refund Compass
          </h1>
          <p className="text-muted-foreground">
            Navigate your way to fair refunds
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <RotateCcw className="h-6 w-6 mr-2" />
              Refund Policy
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Refund Eligibility</h2>
              <p className="text-muted-foreground">
                We offer refunds under the following circumstances:
              </p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Service downtime exceeding 24 hours due to our infrastructure issues</li>
                <li>Billing errors or duplicate charges</li>
                <li>Service cancellation within 7 days of initial purchase</li>
                <li>Failure to deliver promised service specifications</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Refund Timeframes</h2>
              <div className="space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800">7-Day Money Back Guarantee</h3>
                  <p className="text-green-700 text-sm">
                    Full refund available for new customers within 7 days of first purchase.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Pro-rated Refunds</h3>
                  <p className="text-blue-700 text-sm">
                    For service issues, we offer pro-rated refunds based on unused service time.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Non-Refundable Items</h2>
              <p className="text-muted-foreground">
                The following items are not eligible for refunds:
              </p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Domain name registrations and renewals</li>
                <li>SSL certificates</li>
                <li>Setup fees and one-time charges</li>
                <li>Services used for more than 30 days</li>
                <li>Accounts terminated for policy violations</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Refund Process</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Submit Request</h4>
                    <p className="text-muted-foreground text-sm">
                      Contact our support team with your refund request and reason.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Review Process</h4>
                    <p className="text-muted-foreground text-sm">
                      We'll review your request within 2-3 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Processing</h4>
                    <p className="text-muted-foreground text-sm">
                      Approved refunds are processed within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Payment Method Refunds</h2>
              <p className="text-muted-foreground">
                Refunds will be processed using the same payment method used for the original purchase:
              </p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Google Pay: 3-5 business days</li>
                <li>Credit/Debit Cards: 5-10 business days</li>
                <li>Bank Transfers: 7-14 business days</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Partial Refunds</h2>
              <p className="text-muted-foreground">
                In some cases, we may offer partial refunds:
              </p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Service downgrade requests</li>
                <li>Early cancellation with usage</li>
                <li>Service interruptions affecting less than 24 hours</li>
                <li>Account suspensions due to policy violations</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Dispute Resolution</h2>
              <p className="text-muted-foreground">
                If you disagree with our refund decision, you may:
              </p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Request a review by our senior support team</li>
                <li>Escalate to management for final review</li>
                <li>Contact your payment provider for chargeback options</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Service Credits</h2>
              <p className="text-muted-foreground">
                As an alternative to refunds, we may offer service credits for:
              </p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Service interruptions and downtime</li>
                <li>Performance issues</li>
                <li>Customer satisfaction gestures</li>
                <li>Loyalty program benefits</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact for Refunds</h2>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-muted-foreground">
                  To request a refund, please contact our support team:
                </p>
                <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                  <li>Email: refunds@stealordiecloud.com</li>
                  <li>Support Portal: Include your order ID and reason</li>
                  <li>Live Chat: Available 24/7 for immediate assistance</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Policy Updates</h2>
              <p className="text-muted-foreground">
                This refund policy may be updated from time to time. Continued use of our services 
                constitutes acceptance of any changes to this policy.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}