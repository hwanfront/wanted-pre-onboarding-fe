# FE 프리온보딩 챌린지 1주차
## [1주차 과제 설명](https://lean-mahogany-686.notion.site/1-4-00a9f0c9a42641d18ddc989ceb412f1d)
### 과제 1) 사전 과제 3번 문제 보강해서 블로그에 작성하기
- [지난주에 한거](https://github.com/hwanfront/study/blob/main/etc/wanted_pre_challenge_fe.md)
### 과제 2) React와 History API 사용하여 SPA Router 기능 구현하기
#### 1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.
- `/` → `root` 페이지
- `/about` → `about` 페이지
#### 2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.
- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)
#### 3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.
```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```
#### 4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**
```tsx
const { push } = useRouter();
```
## 과제 2) React와 History API 사용하여 SPA Router 기능 구현하기
```bash
components
ㄴRoute.tsx
ㄴRouter.tsx

hooks
ㄴuseRouter.ts

pages
ㄴAbout.tsx
ㄴRoot.tsx

context
ㄴLocationContext.tsx

App.tsx
```
- `History.pushState` 는 페이지 이동 없이 주소만 바꾼다.
```tsx
// useRouter.ts
const useRouter = () => {
  const push = (to: string) => {
    window.history.pushState(null, '', to);
  };

  return { push };
}
```
- 페이지를 이동하면 `window.onpopstate` 이벤트가 발생한다.
- 앞/뒤로가기를 눌렀을 때에는 발생하지만 `History.pushState` 를 하면 발생하지 않는다.
- `Roueter` 안에서 `Route` 가 동작하도록 만들기 위해 Context API 를 생성했다.
```tsx
// LocationContext.tsx
import { createContext } from "react"
import type { Location } from "../utils/createRouter";

interface LocationContextObject {
  location: Location
  setLocation(location: Location): void;
}

const LocationContext = createContext<LocationContextObject>(null!);
export default LocationContext;
```
- `useRouter`를 통해 `push`를 하게되면 `History.pushState` 로 주소와 `location` 이 바뀐다.
```ts
// useRouter.ts
import { useContext } from "react";
import LocationContext from "../context/LocationContext";

const useRouter = () => {
  const { setLocation } = useContext(LocationContext);
  
  const push = (to: string) => {
    setLocation({ pathname: to });
    window.history.pushState(null, '', to);
  };

  return { push };
}

export default useRouter;
```
- 처음 앱을 실행하거나, 앞/뒤로가기를 했을 때 현재 주소에 맞춰 `location`을 바꾼다.
```tsx
// Router.tsx
import LocationContext from "../context/LocationContext";

const Router = ({ children }: RouterProps) => {
  const [location, setLocation] = React.useState({ pathname: "/" });

  const handleLocation = () => {
    const { pathname } = window.location;
    setLocation({ pathname });
  }

  React.useEffect(() => {
    handleLocation()
  }, [])
  

  window.onpopstate = () => {
    handleLocation()
  }

  return (
    <LocationContext.Provider 
      children={children}
      value={{ location, setLocation }}
    />
  );
}

export default Router;
```
- `route` 에 설정된 `path` 와 `location` 이 같으면 컴포넌트를 출력한다.
```tsx
import * as React from "react";
import LocationContext from "../context/LocationContext";

interface RouteProps {
  path: string
  component: React.ReactNode;
}

const Route = ({ path, component }: RouteProps) => {
  const { location } = React.useContext(LocationContext);

  return location.pathname === path ? <>{component}</> : null;
}

export default Route;
```
