import { useEffect } from "react";
import { clearToken, getToken, setToken } from "../helpers/tokenHelper";
import * as tokenApi from "../api/token";

export type UseTokenRenewProps = {
  onRenewFailed: () => void;
};

export function useTokenRenew(props: UseTokenRenewProps) {
  useEffect(() => {
    const renewToken = async () => {
      try {
        const response = await tokenApi.renew();

        const accessToken = response.data?.accessToken;

        if (!accessToken) {
          throw new Error("Could not renew token");
        }

        return setToken(accessToken);
      } catch (e) {
        clearToken();
        props.onRenewFailed();
      }
    };

    if (getToken()) {
      renewToken();
    }
  }, []);
}
