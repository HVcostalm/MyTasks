import IconSymbol,{IconColor} from '@/src/cp/iconsymbol';
import { Tabs } from 'expo-router';

type TabIconProps = {
  color:IconColor,
}

export default function TabLayout() {

  const tarefaOptions = { 
    title:"Tarefas",
    tabBarIcon: ({color}:TabIconProps) => <IconSymbol size={28} name="house.fill" color={color} />
  }

  const historicoOptions = {
    title:"Histórico",
    tabBarIcon: ({color}:TabIconProps) => <IconSymbol size={28} name="book.pages" color={color} />
  }

  const configuracoesOptions = {
    title:"Configurações",
    tabBarIcon: ({color}:TabIconProps) => <IconSymbol size={28} name="gear" color={color} />
  }

  return (
    <Tabs screenOptions = {
      {
        tabBarActiveTintColor: "#000",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 15, 
        },
      }
    }>
      <Tabs.Screen name="(home)" options={tarefaOptions}/>
      <Tabs.Screen name="historico" options={historicoOptions}/>
      <Tabs.Screen name="configuracoes" options={configuracoesOptions}/>
    </Tabs>
  );
}