# useState

## 기본 폴더 구조 생성

- /src/components 폴더 생성
- /src/components/Counter.jsx 생성
- 참고로 실제 프로젝트에서 tsx 가 어렵다면, jsx 로 작업 후 ai 에게 tsx 로 만들어줘. 해도 됨.

### ts 프로젝트에서 jsx 를 사용하도록 설정하기

- `tsconfig.app.json` 수정

```json
{
  "compilerOptions": {
    "composite": true, // ← 프로젝트 참조 사용 시 필요
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "allowJs": true,
    "checkJs": false,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

- `.vscode/settings.json` 수정

```json
{
  "files.autoSave": "off",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "typescript.suggest.autoImports": true,
  "typescript.suggest.paths": true,
  "javascript.suggest.autoImports": true,
  "javascript.suggest.paths": true,

  // 워크스페이스 TS 사용(강력 권장)
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## useState 활용해 보기

```jsx
import { useState } from 'react';

const Counter = () => {
  const [number, setNumber] = useState(0);
  const add = () => {
    setNumber(number + 1);
  };
  const minus = () => {
    setNumber(number - 1);
  };
  const reset = () => {
    setNumber(0);
  };
  return (
    <div>
      <h2>Counter : {number}</h2>
      <button onClick={add}>증가</button>
      <button onClick={minus}>감소</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
};

export default Counter;
```

- 위의 코드를 tsx 로 마이그레이션 진행
- 확장자를 tsx 로 변경

```tsx
import { useState } from 'react';
type CounterProps = {
  children?: React.ReactNode;
};
type VoidFun = () => void;

const Counter = ({}: CounterProps): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const add: VoidFun = () => {
    setCount(count + 1);
  };
  const minus: VoidFun = () => {
    setCount(count - 1);
  };
  const reset: VoidFun = () => {
    setCount(0);
  };
  return (
    <div>
      <h2>Counter : {count}</h2>
      <button onClick={add}>증가</button>
      <button onClick={minus}>감소</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
};

export default Counter;
```

- 사용자 이름 편집 기능 예제
- /src/components/NameEditor.jsx

```jsx
import { useState } from 'react';

function NameEditor() {
  const [name, setName] = useState('');
  const handleChange = e => {
    const temp = e.target.value;
    setName(temp);
  };
  const handleClick = () => {
    console.log('확인');
    setName('');
  };
  return (
    <div>
      <h1>NameEditor</h1>
      <h2>현재 이름 : {name}</h2>
      <input type="text" value={name} onChange={e => handleChange(e)} />
      <button onClick={handleClick}>수정</button>
    </div>
  );
}

export default NameEditor;
```

- tsx 로 마이그레이션

```tsx
import { useState } from 'react';
type NameEditorProps = {
  children?: React.ReactNode;
};
function NameEditor({}: NameEditorProps): JSX.Element {
  const [name, setName] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const temp = e.target.value;
    setName(temp);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter 입력함.');
      handleClick();
    }
  };
  const handleClick = (): void => {
    console.log('확인');
    setName('');
  };
  return (
    <div>
      <h1>NameEditor</h1>
      <h2>현재 이름 : {name}</h2>
      <input
        type="text"
        value={name}
        onChange={e => handleChange(e)}
        onKeyDown={e => handleKeyDown(e)}
      />
      <button onClick={handleClick}>수정</button>
    </div>
  );
}

export default NameEditor;
```
