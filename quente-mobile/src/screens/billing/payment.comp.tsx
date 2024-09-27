import React, { FC, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Row } from "../../components/Row";
import { Button } from "@rneui/themed";
import { observer } from "mobx-react-lite";
import { Text, TextField } from "../../components";
import { spacing } from "../../theme";

type PaymentCompProps = {
  setReceivedAmount: (value: number) => void;
  onBack: () => void;
  total: number;
};

const PaymentComp: FC<PaymentCompProps> = observer(
  (props: PaymentCompProps) => {
    const [receivedAmount, setReceivedAmount] = useState("");
    const [receivedAmountInvalid, setReceivedAmountInvalid] = useState(false);
    const [changeAmount, setChangeAmount] = useState(0);
    const receivedAmountInput = useRef();

    useEffect(() => {
      calculateAmountChange();
    }, []);

    // eslint-disable-next-line no-unused-vars
    const handleReceivedAmount = (amount: string) => {
      setReceivedAmount(amount);
      props.setReceivedAmount(+amount);
      calculateAmountChange(amount);
    };

    const calculateAmountChange = (received?: string) => {
      const receivedMoney = received ?? receivedAmount;
      setReceivedAmountInvalid(+receivedMoney < props.total);
      if(+receivedMoney > 0)setChangeAmount(+receivedMoney - props.total);
    };

    const handleBack = () => {
      props.onBack && props.onBack();
    };

    return (
      <View>
        <Row style={{ marginVertical: spacing.md }}>
          <Button type="outline" onPress={() => handleBack()}>
            REGRESAR
          </Button>
        </Row>
        <Text size="lg" style={{ marginVertical: spacing.md }}>
          EFECTIVO
        </Text>
        <TextField
          containerStyle={{ width: "95%" }}
          onChangeText={handleReceivedAmount}
          value={receivedAmount}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          placeholder="Recibido"
        />
        <Text size="lg" style={{ marginVertical: spacing.md }}>
          CAMBIO
        </Text>
        <Text size="xl">${changeAmount}</Text>
      </View>
    );
  }
);

export default PaymentComp;
