import { supabase } from '../lib/supabase';
import type { Memo, MemoInsert, MemoUpdate } from '../types/MemoType';

// 메모목록 가져오기
export const getMemos = async (): Promise<Memo[]> => {
  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.log(`메모 읽어오기 오류 : ${error.message}`);
  }
  return data || [];
};

// 메모하나 가져오기
export const getMemoById = async (id: number): Promise<Memo | null> => {
  try {
    const { data, error } = await supabase.from('memos').select('*').eq('id', id).single();
    if (error) {
      console.log(`아이디를 통한 메모 읽어오기 오류 ${error.message}`);
    }
    return data;
  } catch (err) {
    console.log(`아이디를 통한 메모 읽어오기 에러 : ${err}`);
    return null;
  }
};

// 메모 생성
export const createMemo = async (newMemo: MemoInsert): Promise<Memo | null> => {
  try {
    const { data, error } = await supabase.from('memos').insert([newMemo]).select().single();
    if (error) {
      console.log(`메모 생성 오류 : ${error.message}`);
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// 메모 업데이트
export const updateMemo = async (id: number, editMemo: MemoUpdate): Promise<Memo | null> => {
  try {
    const { data, error } = await supabase
      .from('memos')
      .update(editMemo)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      console.log(`메모 업데이트 오류 : ${error.message}`);
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// 메모 삭제
export const deleteMemo = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from('memos').delete().eq('id', id);
  if (error) {
    console.log(`메모 삭제 오류 : ${error.message}`);
    return false;
  }
  return true;
};
