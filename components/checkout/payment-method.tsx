import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentMethodProps {
  paymentMethod: "online" | "cod";
  handlePaymentChange: (method: "online" | "cod") => void;
  handleCheckout: () => void;
  isLoading: boolean;
}

export const PaymentMethod = ({
  paymentMethod,
  handlePaymentChange,
  handleCheckout,
  isLoading,
}: PaymentMethodProps) => (
  <div className="space-y-4">
    {/* Payment Mode */}
    <div>
      <Label className="font-medium">Select Payment Mode:</Label>
      <Select
        value={paymentMethod}
        onValueChange={(val: "online" | "cod") => handlePaymentChange(val)}
      >
        <SelectTrigger className="w-full mt-2">
          <SelectValue placeholder="Choose payment method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="online">Online Payment</SelectItem>
          <SelectItem value="cod">Cash on Delivery</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Terms */}
    <div>
      <p>
        By placing order you agree to our{" "}
        <Link href="/T&C" className="underline">
          Terms & Conditions
        </Link>.
      </p>
    </div>

    {/* Checkout Button */}
    <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? "Processing..." : "Place Order"}
    </Button>
  </div>
);
