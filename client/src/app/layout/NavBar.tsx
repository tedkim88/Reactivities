
import { Group } from '@mui/icons-material'
import { Box, AppBar, Toolbar, Typography, Container, MenuItem } from '@mui/material'
import React from 'react'
import MenuItemLink from '../shared/components/MenuItemLink'


// type Props = {
//     openForm: () => void;

// }


export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
            }}>
                <Container maxWidth='xl'>

                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <MenuItem sx={{ display: 'flex', gap: 2 }}>
                                <Group sx={{ fontsize: "large" }} />
                                <Typography variant='h4' fontWeight='bold'>Reactivities</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItemLink to="/activities">
                                Activities
                            </MenuItemLink>
                            <MenuItemLink to='/createActivity'>
                                Create Activity
                            </MenuItemLink>

                        </Box>
                        <MenuItem>
                            User menu
                        </MenuItem>
                    </Toolbar>

                </Container>


            </AppBar>
        </Box>
    )
}
