import {Text, TouchableOpacity, View} from "react-native";
import {Container, ScreenContainer} from "../../components/ScreenContainer";
import {router} from "expo-router";
import BetaBar from "../../components/BetaBar";
import AppBtn from "../../components/AppBtn";
import FormField from "../../components/FormField";
import {useState} from "react";
import register from "../../api/register"
import {save, getValueFor} from "../../api/jwt";
import {BodyText, Title} from "../../components/StyledText";

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("black");

    const submitRegister = async (email, pwd) => {
        const result = await register(form.email, form.password);
        if (!result.token) {
            setMessage(result.message);
            setMessageColor("red");
        } else {
            setMessage(result.token);
            setMessageColor("green");

            await save("userJWT", result.token);

            //redirect to index=>profile
            //but for now directly redirect to profile
            router.replace("/profile");
        }
    }

    return (
        <ScreenContainer>
            <Title>Inscrivez-vous gratuitement :</Title>

            <FormField
                title="Addresse email"
                placeholder="Entrez votre adresse email"
                value={form.email}
                handleChangeText={(e) => setForm({...form, email: e})}
            />

            <FormField
                title="Mot de passe"
                placeholder="Entrez votre mot de passe"
                value={form.password}
                handleChangeText={(e) => setForm({...form, password: e})}
            />

            <AppBtn
                title="S'inscrire"
                handlePress={() =>
                    submitRegister(form.email, form.password)
                }
            />

            <Text style={{color: messageColor}}>{message}</Text>

            <TouchableOpacity
                onPress={() => router.replace("/login")}>
                <BodyText>Vous avez deja un compte ?</BodyText>
            </TouchableOpacity>

        </ScreenContainer>
    )
}