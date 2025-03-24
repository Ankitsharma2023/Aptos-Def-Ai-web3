import React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const WalletConnect = () => {
  const { 
    connect,
    disconnect,
    account,
    wallets,
    connected,
    wallet: currentWallet,
  } = useWallet();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleConnect = async (wallet: any) => {
    try {
      await connect(wallet.name);
      setIsModalOpen(false);
      toast.success(`Successfully connected to ${wallet.name}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success('Wallet disconnected');
    } catch (error: any) {
      toast.error(error.message || 'Failed to disconnect wallet');
    }
  };

  if (connected && account?.address) {
    return (
      <div className="mb-6 p-4 bg-indigo-900/20 border border-indigo-800/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
              {currentWallet?.name?.charAt(0) || 'W'}
            </div>
            <div>
              <div className="text-sm font-medium text-white">
                {currentWallet?.name || 'Connected Wallet'}
              </div>
              <div className="text-xs text-gray-400">
                {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
              </div>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="px-3 py-1 bg-red-900/20 text-red-400 hover:bg-red-900/30 rounded-lg text-sm transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 p-4 bg-indigo-900/20 border border-indigo-800/50 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="text-indigo-400 mt-0.5 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="text-indigo-300 font-medium">Connect your wallet</h3>
            <p className="text-gray-400 text-sm mt-1">
              Connect your Aptos wallet to access the full functionality of AptosDeFAI.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <Wallet size={16} className="mr-2" />
              Connect Wallet
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Connect Wallet</h2>
            <div className="space-y-3">
              {wallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet)}
                  className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">{wallet.name.charAt(0)}</span>
                    </div>
                    <span className="text-white">{wallet.name}</span>
                  </div>
                  {wallet.name === 'Petra' && (
                    <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded">Popular</span>
                  )}
                  {wallet.name === 'Aptos' && (
                    <span className="text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded">New</span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2 px-4 bg-transparent border border-gray-700 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;