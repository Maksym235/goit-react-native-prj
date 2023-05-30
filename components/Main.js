import { useEffect, useState } from "react";
import useRoute from "../Router";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectStateStatus } from "../redux/selectors";
import { authStateChangeUser } from "../redux/auth/authOperation";

export default function Main() {
  const status = useSelector(selectStateStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  const routing = useRoute(status);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
