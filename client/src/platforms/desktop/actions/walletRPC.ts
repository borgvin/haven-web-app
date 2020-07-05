import { getWalletStateIPC} from "platforms/desktop/ipc/misc";
import {HavendState, WalletState} from "platforms/desktop/ipc/ipc-types";
import {GET_WALLET_RPC_STATE_SUCCEED} from "platforms/desktop/actions/types";
import {DesktopAppState} from "platforms/desktop/reducers";
import {selectIsWalletSyncingRemote} from "platforms/desktop/reducers/walletRPC";
import {getWalletHeightSucceed} from "platforms/desktop/actions/chain";

export const getWalletRPCState = () => {
    return (dispatch: any) => {
        getWalletStateIPC()
            .then((res: WalletState) => {
                dispatch(updateWalletRPCState(res));

                if (res.isSyncing) {
                    dispatch(getWalletHeightSucceed(res.syncHeight));
                }
            })
            .catch((err) => dispatch(updateWalletRPCStateFailed(err)));
    };
};

const updateWalletRPCState = (state: WalletState) => {
    return { type: GET_WALLET_RPC_STATE_SUCCEED, payload: state };
};

const updateWalletRPCStateFailed = (err: any) => {
    return { type: GET_WALLET_RPC_STATE_SUCCEED, payload: err };
};