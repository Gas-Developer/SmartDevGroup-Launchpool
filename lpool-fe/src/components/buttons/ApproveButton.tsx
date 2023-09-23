import {
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi";
import { ControlButtonData } from "../interfaces/ControlButtonData";
import { FactoryContractConfig } from "../../abi/factory-abi";
import { useState } from "react";
import { wagmiTokenConfig } from "../../abi/token-abi";
import { maticToWei } from "../../utils/weiCasting";

export function ApproveButton(props: any) {
    // APPROVE
    const { write, data, error, isLoading, isError } = useContractWrite({
        ...wagmiTokenConfig,
        //address: props.tokenAddress,
        address: "0xfCe487d2D7c38be7A35Ed433CA29BBB18aa6e197",
        functionName: "approve",
    });
    const {
        data: receipt,
        isLoading: isPending,
        isSuccess,
    } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            console.log("TX Success");
            console.log("Approve effettuato corretamente");
            props.setIsTokenAllowed(true);
        },
    });

    function approve() {
        console.log("Approving...");
        //function approve(address spender, uint256 amount) public virtual override returns (bool) {
		const approveAmount = parseFloat(props.depositQty);
		const convertedApproveAmount = maticToWei(approveAmount.toString());
        if (convertedApproveAmount) {
            write({
                args: [props.launchpoolAddress, BigInt(convertedApproveAmount)],
            });
        }
    }

    return (
        <div>
            <input
                type="button"
                name="approve_button"
                id="approve_button"
                className={props.className}
                value="Approve"
                onClick={approve}
                title="Approve"
                disabled={false}
            />
        </div>
    );
}
