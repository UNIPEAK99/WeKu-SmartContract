SERVER:
http://demo.weku.io:8545

Available Accounts
==================
(0) 0xf2a34ed99647399076b29f8bfe78f1d541adc0f3
(1) 0x6f003229ec072c5d017bd28e834f59ad914aacb0
(2) 0x070e5e91719ee11557d878020cc5926b2090f78e
(3) 0xf905fe675aa14a57a9e1f962b3d1334658d9683e
(4) 0x36fee00cb9cbfd839984734d3a0ff509ce80987c
(5) 0x92e47c81c3921ee29a1f628f2241047b2e40d767
(6) 0x5f76449704a5c7c6bd6f3bc1b98b163dfe2a5205
(7) 0x842b3fd63b3f7d690b3bfc69f2921f44a06d47f9
(8) 0x28d082746778cb8e9dcd09893c66d36ae8d49439
(9) 0xfffb6a13f94cd05e78e4faeebdb23d01a8bd35d6
Private Keys
==================
(0) 7395f32d49b5db87e3245f8fbfa0ba42017aaf774adf755eca93cf1da324a696
(1) f3f63c1f0fb9042a6544ff963f5b56812d0fcc69edd6671a61945c801d0570e6
(2) c79a4733c4f968a7746647acc01ee191ab3f9232bc598b0ea14cbfc7ff0a51af
(3) 1cddedc32d88328ab6809fc9c469c5cf831f4a5f58c96d85282d40d3e5448c69
(4) 4e3df24904fa0522b2724fce64b397785853a77c9efa06b30b28351e89c8b313
(5) 40831385943a8cf809feb5762f0a1003ab6ea0f54b26068ef9e267eec6df0ae9
(6) 3867b09d916eea85af04e1070200df72b2554b26e6c11fbc53f7caa96d8d11d7
(7) 4ce642212aa9453ac64c2be9f8e387c56038cc95fe66b1548d8a957ed1726c80
(8) 0ef0a0004c03895456a2bf328672e92604291a530b4ab04f24d83157c705ca14
(9) 8a4ef529aa24ea6c578f9d985ae293164564fd93c6433693011dbd11c5bc8baa
HD Wallet
==================
Mnemonic:      wet link chest fish fatigue wise dolphin avocado ordinary narrow crunch harvest
Base HD Path:  m/44'/60'/0'/0/{account_index}

Smart Contract Address==================

WEKU TOKEN
0x914e22e872928aae6b0a68d87fe936dca3242a0e
Crowdsale  
0x5b577ff6892eca401df6bc570b587c577fcd3b65

token owner   address = public_address[0] = 0x6f003229ec072c5d017bd28e834f59ad914aacb0
token founder address = public_address[1] = 0xf2a34ed99647399076b29f8bfe78f1d541adc0f3


-- do not use: Truffle migrate -f 4 —-network test --reset
-- truffle console --network development

WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").totalSupply.call();
WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").burn("1000000000000000000");

WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").transfer("0x070e5e91719ee11557d878020cc5926b2090f78e", 33330000000000000000, {from: "0xf2a34ed99647399076b29f8bfe78f1d541adc0f3"});

WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").balanceOf.call("0xf2a34ed99647399076b29f8bfe78f1d541adc0f3");
WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").transfer("0x070e5e91719ee11557d878020cc5926b2090f78e", '2.0e+24', {from: "0xf2a34ed99647399076b29f8bfe78f1d541adc0f3"});


WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").mintToken("0x070e5e91719ee11557d878020cc5926b2090f78e", 66600000000000000000);

WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").frozenAccount.call("0x28d082746778cb8e9dcd09893c66d36ae8d49439");
WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").freezeAccount("0x28d082746778cb8e9dcd09893c66d36ae8d49439", true);

WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").sellPrice.call();
WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").buyPrice.call();
WEKUToken.at("0x914e22e872928aae6b0a68d87fe936dca3242a0e").setPrices(4000, 3000);



Rinkeby network accounts password: Weku@2018
Main account (deployer/owner): 0x83B50968ca759aE17DB0DFC2104eeAEEB7907d0e
Foundation account: 0x308dC8b184cf7225280feaf642C87cf1Cbd2fCe6
Team account: 0x14a57942185A3F739340dA0ba8Ae268a65697773
Test 1: 0x7E74B77B6d6171dC8BeD3DEbbBD33E1e5B5FeC70

KUU: 0xae4239dcc161f092d09713145d52cc2035bb1d98
Crowdsale: 0x0a67079ba52d98c23dcda12470828b91a105e73d

KUU2: 0x8e5f353bff2afe35a7d75d94b2debd1c63f1a146
Crowdsale2: 0x5ab8d6ecf15c0f73ad79bf6427d934a156f6e25a


geth --rinkeby --rpc --rpcapi db,eth,net,web3,personal --unlock="0x83B50968ca759aE17DB0DFC2104eeAEEB7907d0e"






