# Editor 와 Supabase Storage 연동

- 사용자가 내용 작성 중 이미지를 배치하면
  - 1. 그냥 text 로 처리한다.
  - 2. 이미지를 배치하면 storage 업로드 후 rul 받아서 보여준다.
  - 3. 이미지를 배치하면 미리보기 URL 을 생성한 후 보여주고
    - img src="임시주소", 이미지 파일은 별도로 보관함.
    - 사용자가 저장 버튼 누르면 그때 storage 에 `등록자 폴더생성` 후 저장하고
    - 저장이 성공되면 getURL 로 주소 알아내고,
    - content 의 내용중 `<img src="주소" >` 교체하고,
    - DB 에 저장한다.

## 1. Supabase Storage 설정

### 1.1. `todo-images` 를 생성합니다.

- public bucket 활성
- Restrict file size : 50MB
- `Allowed MIME types : image/jpeg, image/png, image/gif, image/webp, image/svg+xml`
- 주의 사항 : `image/*` 는 배제합니다.

### 1.2. `RLS 를 설정` 합니다.

```sql
CREATE POLICY "Public object access Todo Images" ON storage.objects FOR ALL USING (bucket_id = 'todo-images');
```

### 1.3. 업로드시 `todo-image/사용자ID/파일들...`

## 2. 새글 및 이미지 등록

### 2.1. 텍스트 에디터의 이미지 업로드 기능 처리

- 임시 미리보기 이미지를 생성하고,
- 실제로는 file 업로드 하고,
- url 을 받아서 내용 수정후,
- content 를 insert 함.

- /src/components/RichTextEditor.tsx

- /src/pages/TodoWritePage.tsx
