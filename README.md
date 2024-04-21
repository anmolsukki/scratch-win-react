### 👆 Scratch Card React

## 1.Installation

```
npm install --save scratch-win-react
```

```jsx
import { useRef } from 'react';
import ScratchCard from 'scratch-win-react';
```

## 2.Usage

```jsx
const ref = useRef(null);
```

```jsx
const finishScrashHandler = () => console.log('event call on finish=====>>');
```

```jsx
<ScratchCard ref={ref} width={250} height={250} brushSize={20} finishPercent={50} onComplete={() => finishScrashHandler()} image="https://raw.githubusercontent.com/anmolsukki/scratch-win-react/master/src/coupon.png">
  <p>Play & Win Game</p>
</ScratchCard>
```

## Props

| Prop          | Default |   Type   | Description                                                         |
| ------------- | :-----: | :------: | :------------------------------------------------------------------ |
| width         |    -    |  Number  | Width of the scratch card in pixels                                 |
| height        |    -    |  Number  | Height of the scratch card in pixels                                |
| image         |    -    |  String  | URL or path to the image to be displayed on the scratch card        |
| brushSize     |    -    |  Number  | Brush Size of the scratch card in pixels                            |
| brushCursor   |  arrow  |  String  | URL or path to the image to be displayed on the scratch card        |
| finishPercent |    -    |  Number  | Percentage of the scratch card to be covered for the final layer    |
| onComplete    |    -    | Function | Callback function to be executed when the scratch card is completed |

<u>Note: Custome Cursor Example</u>

```jsx
brushCursor={"url('https://raw.githubusercontent.com/anmolsukki/scratch-win-react/master/src/brush-paint.png'),auto"}

----- OR ----

brushCursor={"pointer"}
```

---

### Hi there, I'm [Anmol](https://www.linkedin.com/in/anmolsukki/) 👋

[![CodeSandbox](https://img.shields.io/badge/Codesandbox-000000?style=flat-round&logo=CodeSandbox)](https://codesandbox.io/u/anmolsukki)&nbsp;&nbsp;&nbsp;
[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=flat-round&logo=discord&logoColor=white)](https://discord.gg/zMkSphwHjE)&nbsp;&nbsp;&nbsp;
[![Linkedin](https://img.shields.io/badge/-LinkedIn-blue?style=flat-round&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/anmolsukki/)](https://www.linkedin.com/in/anmolsukki/)&nbsp;&nbsp;&nbsp;
[![facebook](https://aleen42.github.io/badges/src/facebook.svg)](https://www.facebook.com/Anmolsukki/)&nbsp;&nbsp;&nbsp;
[![twitter](https://aleen42.github.io/badges/src/twitter.svg)](https://twitter.com/anmolsukki)&nbsp;&nbsp;&nbsp;
[![Instagram](https://img.shields.io/badge/-Instagram-e4405f?style=flat-round&logo=Instagram&logoColor=white)](https://www.instagram.com/anmolsukki/)&nbsp;&nbsp;&nbsp;
[![slack](https://aleen42.github.io/badges/src/slack.svg)](https://join.slack.com/t/anmolsukki/shared_invite/zt-k7cfber5-JVl_kGaNdNqvwsMADPiUWg)&nbsp;&nbsp;&nbsp;
[![stackoverflow](https://aleen42.github.io/badges/src/stackoverflow.svg)](https://stackoverflow.com/users/10825957/anmol-kumar-singh)
