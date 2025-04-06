import {Tabs, Redirect, router} from "expo-router";
import {Image, Text, View} from "react-native";
import "../../global.css"

import {icons} from '../../constants';
import {getValueFor, isAuth} from "../../api/jwt";
import {useEffect, useState} from "react";

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View
            className="items-center justify-center gap-2 w-20"
        >
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6 mt-8"
                style={{}}
            />

            <Text className={`${focused ? 'font-semibold' : ''} text-xs`}
                  style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}

export default function TabsLayout() {

    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: "#f1df46",
                tabBarInactiveTintColor: "#e6e6e6",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#131313",
                    borderTopWidth: 1,
                    borderTopColor: "#232323",
                    height: 84,
                }
            }}>

                <Tabs.Screen name="home" options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}/>

                <Tabs.Screen name="workout" options={{
                    title: "Workout",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.plus}
                            color={color}
                            name="Workout"
                            focused={focused}
                        />
                    )
                }}/>

                <Tabs.Screen name="profile" options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name="Profile"
                            focused={focused}
                        />
                    )
                }}/>

            </Tabs>
        </>
    );
}
