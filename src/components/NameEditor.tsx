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
