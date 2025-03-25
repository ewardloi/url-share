import { useEffect } from "react";
import { clearToken, getToken } from "../helpers/tokenHelper";
import * as tokenApi from "../api/token";

export type UseTokenRenewProps = {
  onRenewFailed: () => void;
};

export function useTokenRenew(props: UseTokenRenewProps) {
  useEffect(() => {
    const renewToken = async () => {
      if (await tokenApi.renew()) return;

      clearToken();
      props.onRenewFailed();
    };

    if (getToken()) {
      renewToken();
    }
  }, []);
}
