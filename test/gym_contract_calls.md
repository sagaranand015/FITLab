### Gym Contract calls

GymStore SC deployed to `0xED012b3C82E793a982Df0131ae8a5Ecea4448c5c`

#### Get GymStore Contract
const g = await ethers.getContractFactory("GymStore");
const gymStore = await g.attach("0xED012b3C82E793a982Df0131ae8a5Ecea4448c5c");


#### GymStore Contract function calls
```
const storeCreatedRes = await gymStore.createStore('Anytime Fitness Gym', 'ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4', 'Bangalore, India', 'ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4')

const storeCreatedRes = await gymStore.createStore('Zero Gravity Health Club', 'ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4', 'New Delhi, India', 'ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4')

const storeCreatedRes = await gymStore.createStore('Divine Fitness Health Club', 'ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4', 'Mumbai, India', 'ipfs://bafkreicbbj3cxhq75hwoh37livm7fdgh7z4hycbunsuqkjkkjwegon27y4')
```

2. `const ownerStoreRes = await gymStore.getOwnerStore('0x9A9B3fBb7c83D82E7cF696d6F2ecCa35Ba00C356')`

2. `const storeNumRes = await gymStore.getStoreNumber()`

2. `const storeRes = await gymStore.getStore(2)`

2. `const storeOwnerRes = await gymStore.getStoreOwner(2)`

2. `const storeIdRes = await gymStore.getStoreId('0xf4267F20B463421D2cF3db534491b7920F79Ac4F')`

2. `const allStoresRes = await gymStore.getAllStores()`



