import React from "react";

export default function LoginView(props){
  const { activateKey } = props;
  return (
    <div className="bg-neutral-300 mt-2 shadow shadow-xl shadow-slate-200 pt-6 pb-10">
      <div className="text-lg leading-6 mb-8">
        <p>Login to start sharing bills with friends</p>
        <p>any time, in any currency, on any chain</p>
      </div>
      <LoginButton label="Metamask" activateKey={activateKey}/>
      <LoginButton label="WalletConnect" activateKey={activateKey}/>
      <LoginButton label="Everscale" activateKey={activateKey}/>
      <div>
      <p className="tracking-tighter mt-10">Powered by Ylide</p>
      </div>
    </div>
  )
}

function LoginButton(props) {
  const { label, activateKey } = props;
  return (
    <div className="rounded-lg w-64 bg-emerald-500 text-white
      text-center m-auto mt-4 mb-6 h-10 pt-1 text-lg font-bold cursor-pointer hover:bg-emerald-600" onClick={activateKey}>
    {label}
  </div>
  )
}