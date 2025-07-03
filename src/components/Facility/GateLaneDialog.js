import React, { useContext, useCallback, useEffect, useRef } from "react";
// import { makeStyles } from '@mui/material/styles';

import {
    //   FormGroup,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    MenuItem
} from '@mui/material';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
    TextField,
    Checkbox,
    Radio,
    Switch,
    Button,
    DialogContent,
    DialogActions,
} from "../common";

const GateLaneDialog = ({
    data = {
        parkingFacilityGateId: null,
        name: "",
        description: "",
        vehicleType: "",
        direction: "",
        isEnabled: true,
        reversibleLane: false,
        reversibleLaneManualActive: false
    },
    allRegions = [],
    allParkingFacilities = [],
    allParkingFacilityGates = [],
    onConfirm = () => { },
}) => {
    const [state, setState] = React.useState(data);
    const { closeDialog, t } = useContext(GlobalContext);
    const initialDataRef = useRef(data);

    // 當 data prop 變更時，更新 state (但只在真正需要時才更新)
    useEffect(() => {
        // 只有當 data 確實改變時才更新 state
        // 使用 JSON.stringify 進行深度比較
        if (JSON.stringify(data) !== JSON.stringify(initialDataRef.current)) {
            setState(data);
            initialDataRef.current = data;
        }
    }, [data]);

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

    // 將停車場閘道按設施分組
    const groupGatesByFacility = () => {
        const facilityMap = {};
        allParkingFacilityGates.forEach(gate => {
            if (!facilityMap[gate.parkingFacilityId]) {
                facilityMap[gate.parkingFacilityId] = [];
            }
            facilityMap[gate.parkingFacilityId].push(gate);
        });
        return facilityMap;
    };

    // 遞迴產生 MenuItem，區域和停車場設施不可選擇，只有停車場閘道可選擇
    const renderRegionFacilityAndGateOptions = (regions, level = 0) => {
        const facilityMap = groupFacilitiesByRegion();
        const gateMap = groupGatesByFacility();
        
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
            // 該區域下的停車場設施及其閘道
            ...(facilityMap[region.regionId] || []).flatMap(facility => [
                // 停車場設施選項 - 不可選擇，僅用於顯示
                <MenuItem
                    key={`facility-${facility.parkingFacilityId}`}
                    value=""
                    disabled
                    sx={{
                        pl: (level + 2) * 2,
                        fontWeight: 'bold',
                        color: 'text.secondary'
                    }}
                >
                    {facility.name}
                </MenuItem>,
                // 該停車場設施下的閘道
                ...(gateMap[facility.parkingFacilityId] || []).map(gate => (
                    <MenuItem
                        key={`gate-${gate.parkingFacilityGateId}`}
                        value={gate.parkingFacilityGateId}
                        sx={{
                            pl: (level + 3) * 2  // 比停車場設施多一層縮排
                        }}
                    >
                        {gate.name}
                    </MenuItem>
                ))
            ]),
            // 遞迴處理子區域
            ...renderRegionFacilityAndGateOptions(region.children, level + 1)
        ]);
    };

    // 處理可逆車道變更
    const handleReversibleLaneChange = (event) => {
        const isReversible = event.target.checked;
        setState({ 
            ...state, 
            reversibleLane: isReversible,
            // 當關閉可逆車道時，自動將手動啟用設為 false
            reversibleLaneManualActive: isReversible ? state.reversibleLaneManualActive : false
        });
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
                    label={t("gate-lane")}
                    required
                    fullWidth
                    sx={{ marginBottom: 2.5 }}
                    value={state.parkingFacilityGateId || ""}
                    onChange={e => setState({ ...state, parkingFacilityGateId: e.target.value })}
                >
                    {renderRegionFacilityAndGateOptions(regionTree)}
                </TextField>
                <TextField
                    label={t("name")}
                    required
                    type="text"
                    fullWidth
                    sx={{ marginBottom: 2.5 }}
                    value={state.name || ""}
                    onChange={e => setState({ ...state, name: e.target.value })}
                />
                <TextField
                    label={t("description")}
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ marginBottom: 2.5 }}
                    value={state.description || ""}
                    onChange={e => setState({ ...state, description: e.target.value })}
                />
                
                {/* 車輛種類選擇 */}
                <FormControl component="fieldset" sx={{ marginBottom: 2.5, width: '100%' }}>
                    <FormLabel component="legend">{t("vehicle.type")}</FormLabel>
                    <RadioGroup
                        value={state.vehicleType || ""}
                        onChange={e => setState({ ...state, vehicleType: e.target.value })}
                        row
                    >
                        <FormControlLabel
                            value="Car"
                            control={<Radio />}
                            label={t("vehicle.car")}
                        />
                        <FormControlLabel
                            value="Motorbike"
                            control={<Radio />}
                            label={t("vehicle.motorcycle")}
                        />
                    </RadioGroup>
                </FormControl>

                {/* 車道進出方向選擇 */}
                <FormControl component="fieldset" sx={{ marginBottom: 2.5, width: '100%' }}>
                    <FormLabel component="legend">{t("lane.direction")}</FormLabel>
                    <RadioGroup
                        value={state.direction || ""}
                        onChange={e => setState({ ...state, direction: e.target.value })}
                        row
                    >
                        <FormControlLabel
                            value="in"
                            control={<Radio />}
                            label={t("direction.in")}
                        />
                        <FormControlLabel
                            value="out"
                            control={<Radio />}
                            label={t("direction.out")}
                        />
                    </RadioGroup>
                </FormControl>

                {/* 車道開放狀態 */}
                <FormControlLabel
                    control={
                        <Switch
                            checked={Boolean(state.isEnabled)}
                            onChange={e => setState({ ...state, isEnabled: e.target.checked })}
                        />
                    }
                    label={t("enabled")}
                    sx={{ marginBottom: 2.5, display: 'block' }}
                />

                {/* 可逆車道 */}
                <FormControlLabel
                    control={
                        <Switch
                            checked={Boolean(state.reversibleLane)}
                            onChange={handleReversibleLaneChange}
                        />
                    }
                    label={t("lane.reversible")}
                    sx={{ marginBottom: 2.5, display: 'block' }}
                />

                {/* 可逆車道手動啟用 - 只有當 reversibleLane 為 true 時才顯示 */}
                {state.reversibleLane && (
                    <FormControlLabel
                        control={
                            <Switch
                                checked={Boolean(state.reversibleLaneManualActive)}
                                onChange={e => setState({ ...state, reversibleLaneManualActive: e.target.checked })}
                            />
                        }
                        label={t("lane.reversible-enabled")}
                        sx={{ marginBottom: 2.5, display: 'block', marginLeft: 2 }}
                    />
                )}
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

export default GateLaneDialog