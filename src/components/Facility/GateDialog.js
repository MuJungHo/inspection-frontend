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

const GateDialog = ({
    data = {
        parkingFacilityId: "",
        parkingFacilityGateId: null,
        name: "",
        description: ""
    },
    allRegions = [],
    allParkingFacilities = [],
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

    // 將停車場設施按區域分組
    const groupFacilitiesByRegion = () => {
        const regionMap = {};
        allParkingFacilities.forEach(facility => {
            if (!regionMap[facility.regionId]) {
                regionMap[facility.regionId] = [];
            }
            regionMap[facility.regionId].push(facility);
        });
        return regionMap;
    };

    // 遞迴產生 MenuItem，區域不可選擇，停車場設施可選擇
    const renderRegionAndFacilityOptions = (regions, level = 0) => {
        const facilityMap = groupFacilitiesByRegion();
        
        return regions.flatMap(region => [
            // 區域選項 - 不可選擇，僅用於顯示
            <MenuItem
                key={`region-${region.regionId}`}
                value=""
                disabled
                sx={{
                    pl: (level + 1) * 2,
                    fontWeight: 'bold',
                    color: 'text.secondary'
                }}
            >
                {region.name}
            </MenuItem>,
            // 該區域下的停車場設施
            ...(facilityMap[region.regionId] || []).map(facility => (
                <MenuItem
                    key={`facility-${facility.parkingFacilityId}`}
                    value={facility.parkingFacilityId}
                    sx={{
                        pl: (level + 2) * 2  // 比區域多一層縮排
                    }}
                >
                    {facility.name}
                </MenuItem>
            )),
            // 遞迴處理子區域
            ...renderRegionAndFacilityOptions(region.children, level + 1)
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
                    label={t("parking-facility")}
                    required
                    fullWidth
                    sx={{ marginBottom: 2.5 }}
                    value={state.parkingFacilityId || ""}
                    onChange={e => setState({ ...state, parkingFacilityId: e.target.value })}
                >
                    {renderRegionAndFacilityOptions(regionTree)}
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

export default GateDialog