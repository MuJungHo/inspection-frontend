import React, { useContext, useRef } from "react";
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import ComputerIcon from '@mui/icons-material/Computer';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import { IconButton } from "../common"
// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
  Button,
  DialogContent,
  DialogActions,
} from "../common";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 5,
    padding: '0.5rem 1rem',
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  box: {
    width: '100%',
    height: 380,
    overflow: 'auto',
  }

}));

const Card = ({ id, text, index, moveCard, onDelete, onDidDrop }) => {
  const ref = useRef(null);
  const classes = useStyles();
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDidDrop()
      }
    }
  })
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref))
  return (
    <Box
      className={classes.card}
      sx={(theme) => ({
        backgroundColor: theme.palette.paper.background,
        color: theme.palette.paper.color,
      })}
      ref={ref}
      style={{ cursor: 'move', opacity }}
      data-handler-id={handlerId}>
      {text}
      <IconButton onClick={onDelete}>
        <RemoveIcon />
      </IconButton>
    </Box>
  )
}

const Priority = ({
  failoverGroup = {
  },
}) => {
  const classes = useStyles();
  const { t, authedApi, closeDialog, openSnackbar, } = useContext(GlobalContext);
  const [edgeServerList, setEdgeServerList] = React.useState([]);
  const [failoverGroupMemberList, setFailoverGroupMemberList] = React.useState([]);
  const isExisted = (edgeServer) => !!failoverGroupMemberList.find(failoverGroupMember => failoverGroupMember.edgeServerId === edgeServer.edgeServerId)
  const arrayMove = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };


  const moveCard = (dragIndex, hoverIndex) => {
    const dragCards = arrayMove([...failoverGroupMemberList], dragIndex, hoverIndex);
    // console.log(dragCards)
    setFailoverGroupMemberList([...dragCards])
  }

  React.useEffect(() => {
    getEdgeServers();
    getFailoverGroupMembersById();
  }, [])


  const getEdgeServers = async () => {
    const { data } = await authedApi.edgeServer.getEdgeServers();

    const _rows = data.map(a => ({ ...a, _id: a.edgeServerId }));

    setEdgeServerList(_rows);

  }

  const getFailoverGroupMembersById = async () => {
    const { data } = await authedApi.failoverGroupMember.getFailoverGroupMembersById({ id: failoverGroup.failoverGroupId });

    const _data = data
      .sort((a, b) => a.priority - b.priority)
      .map(async a => {
        const { data } = await authedApi.edgeServer.getEdgeServerById({ id: a.edgeServerId });
        return {
          ...a,
          id: a.failoverGroupMemberId,
          text: data.name
        }
      });

    const _rows = await Promise.all(_data)

    setFailoverGroupMemberList(_rows);
  }

  const handleAddFailoverGroupMember = async edgeServer => {
    const { success } = await authedApi
      .failoverGroupMember.postCreateFailoverGroupMember({
        data: {
          EdgeServerId: edgeServer.edgeServerId,
          FailoverGroupId: failoverGroup.failoverGroupId,
          Priority: failoverGroupMemberList.length
        }
      });

    if (success) {
      getFailoverGroupMembersById();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("add") })
      });
    }
  }

  const handleDeleteFailoverGroupMember = async failoverGroupMember => {
    const { success } = await authedApi
      .failoverGroupMember
      .deleteFailoverGroupMember({ id: failoverGroupMember.failoverGroupMemberId });

    if (success) {
      getFailoverGroupMembersById();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleOnDidDrop = async () => {
    const results = await Promise.all(failoverGroupMemberList.map(async (failoverGroupMember, index) =>
      await authedApi
        .failoverGroupMember
        .patchUpdateFailoverGroupMember({
          id: failoverGroupMember.failoverGroupMemberId,
          data: {
            ...failoverGroupMember,
            priority: index + 1
          }
        })
    ));

    if (results.every(result => result.success)) {
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }

  }

  return (
    <DndProvider backend={HTML5Backend}>
      <DialogContent
        dividers
      // className={classes.content}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={2}
          sx={{ justifyContent: 'center', alignItems: 'center', width: 500 }}
        >
          <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <ComputerIcon sx={{ mr: 1 }} /> {t("edge-server")}
          </Grid>
          <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <LowPriorityIcon sx={{ mr: 1 }} />{t("priority")}
          </Grid>
          <Grid size={6}>
            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.container.background
              })}
              className={classes.box}>
              {
                edgeServerList
                  .map((edgeServer) =>
                    <Box
                      sx={(theme) => ({
                        backgroundColor: theme.palette.paper.background,
                        color: theme.palette.paper.color,
                      })}
                      className={classes.card}
                      key={edgeServer.edgeServerId}
                      style={{ cursor: isExisted(edgeServer) ? 'not-allowed' : 'default' }}>
                      {edgeServer.name}
                      <IconButton
                        disabled={isExisted(edgeServer)}
                        onClick={() => handleAddFailoverGroupMember(edgeServer)}>
                        <AddIcon />
                      </IconButton>
                    </Box>)
              }
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.container.background
              })}
              className={classes.box}>
              {
                failoverGroupMemberList
                  .map((card, index) =>
                    <Card
                      key={card.id}
                      index={index}
                      id={card.id}
                      text={card.text}
                      moveCard={moveCard}
                      onDelete={() => handleDeleteFailoverGroupMember(card)}
                      onDidDrop={handleOnDidDrop}
                    />)
              }
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("close")}
        </Button>
        {/* <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
          {t("confirm")}
        </Button> */}
      </DialogActions>
    </DndProvider>)
}

export default Priority