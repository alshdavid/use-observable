import { useState, useEffect } from "react";
import { Subscribable, BehaviorSubject, Observable, Subject } from 'rxjs'

export const useSubscribable = <T>(
  subscribable: Subscribable<T>, 
  defaultValue: T
): T | undefined => {
  const [ value, setValue ] = useState(defaultValue);

  useEffect(
    () => {
      const subscription = subscribable.subscribe(setValue);
      return () => subscription.unsubscribe();
    },
    [subscribable]
  );

  return value;
};

export const useObservable = <T>(
  observable: Observable<T>, 
  defaultValue: T
) => useSubscribable(observable, defaultValue)

export const useSubject = <T>(
  subject: Subject<T>, 
  defaultValue: T
) => useSubscribable(subject, defaultValue)

export const useBehaviorSubject = <T>(
  behaviorSubject: BehaviorSubject<T>, 
) => useSubscribable(behaviorSubject, behaviorSubject.value)
