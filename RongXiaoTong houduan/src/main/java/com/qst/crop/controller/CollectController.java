package com.qst.crop.controller;

import com.qst.crop.common.Result;
import com.qst.crop.common.StatusCode;
import com.qst.crop.entity.Collect;
import com.qst.crop.service.CollectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.Date;

@Tag(name = "收藏模块接口")
@RestController
@RequestMapping("/collect")
@CrossOrigin
public class CollectController {

    @Autowired
    private CollectService collectService;

    // 添加收藏
    @Operation(summary = "添加收藏")
    @PostMapping("/add/{targetId}/{type}")
    public Result addCollect(@PathVariable Integer targetId, @PathVariable Integer type) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userName = principal.getUsername();

        Collect collect = new Collect();
        collect.setUserName(userName);
        collect.setTargetId(targetId);
        collect.setType(type);
        collect.setCreateTime(new Date());

        boolean isSuccess = collectService.addCollect(collect);
        return isSuccess ?
                new Result(true, StatusCode.OK, "收藏成功") :
                new Result(false, StatusCode.ERROR, "已收藏过");
    }

    // 取消收藏
    @Operation(summary = "取消收藏")
    @DeleteMapping("/cancel/{targetId}/{type}")
    public Result cancelCollect(@PathVariable Integer targetId, @PathVariable Integer type) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userName = principal.getUsername();

        boolean isSuccess = collectService.cancelCollect(userName, targetId, type);
        return isSuccess ?
                new Result(true, StatusCode.OK, "取消收藏成功") :
                new Result(false, StatusCode.ERROR, "取消失败");
    }

    // 检查是否已收藏
    @Operation(summary = "检查是否已收藏")
    @GetMapping("/check/{targetId}/{type}")
    public Result checkCollect(@PathVariable Integer targetId, @PathVariable Integer type) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userName = principal.getUsername();

        boolean isCollected = collectService.checkCollect(userName, targetId, type);
        return new Result(true, StatusCode.OK, "查询成功", isCollected);
    }
}