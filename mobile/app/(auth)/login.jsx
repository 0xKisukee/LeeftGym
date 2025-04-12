import {Text, TouchableOpacity, View} from "react-native";
import {Container, ScreenContainer} from "../../components/ScreenContainer";
import {router} from "expo-router";
import BetaBar from "../../components/BetaBar";
import AppBtn from "../../components/AppBtn";
import FormField from "../../components/FormField";
import {useState, useContext} from "react";
import {login} from "../../api/login"
import {save} from "../../api/jwt";
import {containers, typography} from "../../styles/theme";
import {Title, BodyText} from "../../components/StyledText";
import { UserContext } from "../../contexts/UserContext";

export default function Login() {
    const { setIsAuth } = useContext(UserContext);
    
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("red");

    const submitLogin = async () => {
        const result = await login(form.email, form.password);

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
            setIsAuth(true);
        }
    }

    return (
        <ScreenContainer>
            <Title>Connectez-vous :</Title>

            <FormField
                title="Addresse email"
                placeholder="Entrez votre adresse email"
                value={form.email}
                handleChangeText={(e) => setForm({...form, email: e})}
            />

            <FormField
                title="Mot de passe"
                placeholder="Entrez un mot de passe"
                value={form.password}
                handleChangeText={(e) => setForm({...form, password: e})}
            />

            <AppBtn
                title="Connexion"
                handlePress={() =>
                    submitLogin()
                }
            />

            <Text style={{color: messageColor}}>{message}</Text>

            <TouchableOpacity
                onPress={() => router.replace("/register")}>
                <BodyText>Pas de compte ?</BodyText>
            </TouchableOpacity>
        </ScreenContainer>
    )
}