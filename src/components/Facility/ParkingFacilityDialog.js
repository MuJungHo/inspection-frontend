import React, { useContext, useCallback } from "react";
// import { makeStyles } from '@mui/material/styles';

import {
    //   FormGroup,
    //   RadioGroup
    MenuItem
} from '@mui/material';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
    TextField,
    // Checkbox, Radio, 
    Button,
    DialogContent,
    DialogActions,
} from "../common";

const ParkingFacilityDialog = ({
    data = {
        parkingFacilityId: null,
        regionId: "",
        name: "",
        description: ""
    },
    allRegions = [],
    onConfirm = () => { },
}) => {
    const [state, setState] = React.useState(data);
    const { closeDialog, t } = useContext(GlobalContext);
    //   debugger;

    // 將 allRegions 轉換為階層結構
    const buildRegionTree = (regions) => {
        const regionMap = {};
        regions.forEach(region => {
            regionMap[region.regionId] = { ...region, children: [] };
        });
        const tree = [];
        regions.forEach(region => {
            if (region.parentRegionId == null) {
                tree.push(regionMap[region.regionId]);
            } else if (regionMap[region.parentRegionId]) {
                regionMap[region.parentRegionId].children.push(regionMap[region.regionId]);
            }
        });
        return tree;
    };

    // 遞迴產生 MenuItem，並用縮排顯示階層
    const renderRegionOptions = (regions, level = 0) => {
        return regions.flatMap(region => [
            <MenuItem
                key={region.regionId}
                value={region.regionId}
                sx={{
                    // 只在下拉選單顯示縮排，不影響 select 顯示
                    pl: (level + 1) * 2
                }}
            >
                {region.name}
            </MenuItem>,
            ...renderRegionOptions(region.children, level + 1)
        ]);
    };

    const regionTree = buildRegionTree(allRegions);

    return (
        <>
            <DialogContent
                dividers
                sx={{
                    width: 500
                }}>
                <TextField
                    select
                    label={t("factory")}
                    required
                    fullWidth
                    sx={{ marginBottom: 2.5 }}
                    value={state.regionId || ""}
                    onChange={e => setState({ ...state, regionId: e.target.value })}
                >
                    {renderRegionOptions(regionTree)}
                </TextField>
                <TextField
                    label={t("name")}
                    required
                    type="text"
                    fullWidth
                    sx={{ marginBottom: 2.5 }}
                    value={state.name}
                    onChange={e => setState({ ...state, name: e.target.value })}
                />
                <TextField
                    label={t("description")}
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ marginBottom: 2.5 }}
                    value={state.description}
                    onChange={e => setState({ ...state, description: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>
                    {t("cancel")}
                </Button>
                <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
                    {t("confirm")}
                </Button>
            </DialogActions>
        </>
    )
}

export default ParkingFacilityDialog