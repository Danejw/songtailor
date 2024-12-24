import { FC } from "react";

interface PriceSummaryProps {
  basePrice: number;
  values: {
    wantCoverImage?: boolean;
    wantSecondSong?: boolean;
    wantSecondCoverImage?: boolean;
  };
}

export const PriceSummary: FC<PriceSummaryProps> = ({ basePrice, values }) => {
  const calculateTotal = () => {
    let total = basePrice;
    if (values.wantCoverImage) total += 5;
    if (values.wantSecondSong) {
      total += 15;
      if (values.wantSecondCoverImage) total += 5;
    }
    return total;
  };

  const total = calculateTotal();

  return (
    <div className="rounded-lg bg-muted p-6 space-y-2">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between">
        <span>Base Package</span>
        <span>${basePrice.toFixed(2)}</span>
      </div>
      {values.wantCoverImage && (
        <div className="flex justify-between">
          <span>Cover Image</span>
          <span>+$5.00</span>
        </div>
      )}
      {values.wantSecondSong && (
        <div className="flex justify-between">
          <span>Second Song</span>
          <span>+$15.00</span>
        </div>
      )}
      {values.wantSecondSong && values.wantSecondCoverImage && (
        <div className="flex justify-between">
          <span>Second Song Cover Image</span>
          <span>+$5.00</span>
        </div>
      )}
      <div className="pt-4 border-t mt-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};