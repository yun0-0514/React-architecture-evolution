import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  root?: null; //감시할 상위 요소
  rootMargin?: string; //감시 영역 확장,미리 불러오기 위한 영역 설정
  threshold?: number; //관측 요소가 얼마나 보였을 때 실행할지(0~1.0)정규화
  onIntersect: () => void; //관측되었을 때 실행할 콜백 함수
  enabled?: boolean; //감시를 켤지 끌지 여부(로딩중, 페이지가 없는 경우 꺼야함)
}

export const useIntersectionObserver = ({
  root = null,
  rootMargin = "0px",
  threshold = 1.0,
  onIntersect,
  enabled = true,
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current || !enabled) {
      return;
    }
    const observer = new IntersectionObserver(
      //브라우저에서 지원하는 객체
      //어떤 요소에 대한 관찰의 역할을 수행함
      (entries) => {
        //entries는 관측될 요소들의 배열
        entries.forEach((entry) => {
          if (entry.isIntersecting && enabled) {
            onIntersect();
          }
        });
      },
      { root, rootMargin, threshold }
    );
    observer.observe(targetRef.current);
    //방아쇠의 역할을 수행함
    //Ref.current가 감시해야할 특정 HTML요소이고
    //observer.observe(target)은 target을 감시하라는 것을 의미함
    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, onIntersect, enabled]);
  return targetRef;
};
//무한 스크롤을 위한 눈의 역할을 하는 커스텀 훅
