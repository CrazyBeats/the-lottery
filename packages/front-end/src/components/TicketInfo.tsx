import React, { useState } from "react";
import { ContractInfo, TicketData, CountdownData } from "../types";

interface TicketInfoProps {
  initialContractInfo?: ContractInfo;
  initialTicketData?: TicketData;
  initialCountdown?: CountdownData;
}

const TicketInfo: React.FC<TicketInfoProps> = ({
  initialContractInfo = {
    address: "0x4723...76462d",
    nextDraw: "24th Sept at 9 AM UTC",
    userTickets: 0,
  },
  initialTicketData = {
    cost: 500,
    quantity: 500,
    maxLimit: 100000,
  },
  initialCountdown = {
    days: 1,
    hours: 22,
    minutes: 23,
  },
}) => {
  const [ticketData, setTicketData] = useState<TicketData>(initialTicketData);
  const [contractInfo] = useState<ContractInfo>(initialContractInfo);
  const [countdown] = useState<CountdownData>(initialCountdown);

  const handleQuantityChange = (quantity: number) => {
    setTicketData({
      ...ticketData,
      quantity: quantity,
    });
  };

  return (
    <div className="flex justify-center gap-4 my-8">
      <div className="bg-yuzu-cream rounded-lg p-6 text-black w-80">
        <div className="text-center mb-4">
          <div>Get Your Ticket Now!</div>
          <div className="text-4xl font-bold text-orange-500">
            {countdown.days}d {countdown.hours}h {countdown.minutes}m
          </div>
          <div className="text-sm mb-4">Until the draw</div>
        </div>
        <div className="text-sm">
          <div className="flex justify-between mb-2">
            <span>Contract Address</span>
            <span className="flex items-center">
              {contractInfo.address}
              <button
                className="ml-1"
                onClick={() =>
                  navigator.clipboard.writeText(contractInfo.address)
                }
              >
                📋
              </button>
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Next Draw</span>
            <span>{contractInfo.nextDraw}</span>
          </div>
          <div className="flex justify-between">
            <span>Your Ticket</span>
            <span>{contractInfo.userTickets}</span>
          </div>
        </div>
      </div>

      <div className="w-80">
        <div className="bg-[#FFA706] rounded-t-lg p-4 border-[2px] border-[#102C24]">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[#102c24] text-[14px] font-medium font-['Poppins']">Buy</div>
            <div className="text-[#2D6A4F] font-medium">MAX {ticketData.maxLimit.toLocaleString()} YUZU</div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <input
              type="number"
              value={ticketData.quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                const limitedValue = Math.min(value, ticketData.maxLimit);
                handleQuantityChange(limitedValue);
              }}
              className="text-5xl font-bold text-[#2D6A4F] bg-transparent w-32 outline-none"
              min="0"
              max={ticketData.maxLimit}
            />
            <div className="text-[#E6622B] font-medium">Ticket</div>
          </div>

          <div className="flex justify-between gap-2">
            <button
              className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium"
              onClick={() => handleQuantityChange(5)}
            >
              5
            </button>
            <button
              className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium"
              onClick={() => handleQuantityChange(10)}
            >
              10
            </button>
            <button
              className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium"
              onClick={() => handleQuantityChange(50)}
            >
              50
            </button>
            <button
              className="bg-[#f39321] hover:bg-[#f39321] flex-1 py-2 rounded-lg text-[#fff6a4] font-medium"
              onClick={() => handleQuantityChange(ticketData.maxLimit)}
            >
              MAX
            </button>
          </div>
        </div>

        <div className="bg-[#157433] rounded-b-lg p-4 border-x-[2px] border-[#102C24] shadow-[0_4px_0_rgba(0,0,0,1)]">
          <div className="flex justify-between mb-4 text-white">
            <span>Cost</span>
            <span>{ticketData.quantity} YUZU</span>
          </div>

          <button
            className="bg-[#C2F970] hover:bg-[#B5EC63] w-full py-3 rounded-lg text-[#102C24] font-bold mb-2  shadow-[0_3px_0_rgba(0,0,0,1)]"
            onClick={() => console.log(`Buying ${ticketData.quantity} tickets`)}
          >
            Buy {ticketData.quantity} Tickets
          </button>

          <div className="text-xs text-center text-white/80">
            Buying ticket will cost YUZU, and all purchases are final
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
