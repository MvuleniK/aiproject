import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import colors from '../assets/materials/colors'

const OptionsListItem = ({ title, handlePress, icon, isbottom }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <ListItem bottomDivider={isbottom ? true : false}>
        {icon != undefined ? icon : null}
        <ListItem.Content>
          <ListItem.Title style={styles.text}>{title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  )
}

export default OptionsListItem

const styles = StyleSheet.create({
  text: {
    color: colors.black
  }
})
